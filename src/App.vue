<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white/60 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-semibold text-gray-800">Gego Analytics</h1>
              <p class="text-sm text-gray-500">Generative Engine Optimization Platform</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center px-3 py-1.5 bg-green-50 rounded-lg border border-green-200/50">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span class="text-sm font-medium text-green-700">{{ connectionStatus }}</span>
            </div>
            <button 
              @click="refreshData"
              :disabled="loading"
              class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span class="font-medium">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Error Alert -->
      <div v-if="error" class="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-semibold text-red-800">Connection Error</h3>
            <div class="mt-1 text-sm text-red-700">
              <p>{{ error }}</p>
              <p class="mt-1">Make sure the Gego API server is running on <code class="bg-red-100 px-1 rounded text-xs">http://localhost:8989</code></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !stats" class="flex justify-center items-center py-16">
        <div class="text-center">
          <div class="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="animate-spin h-6 w-6 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-700 mb-1">Loading Analytics</h3>
          <p class="text-gray-500">Fetching data from your LLM providers...</p>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-if="stats && !loading">
        <!-- Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Responses</p>
                <p class="text-2xl font-semibold text-gray-800 mt-1">{{ stats?.total_responses?.toLocaleString() || 0 }}</p>
                <p class="text-xs text-gray-500 mt-1">Across all LLMs</p>
              </div>
              <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Active Prompts</p>
                <p class="text-2xl font-semibold text-gray-800 mt-1">{{ stats?.total_prompts || 0 }}</p>
                <p class="text-xs text-gray-500 mt-1">Currently running</p>
              </div>
              <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">LLM Providers</p>
                <p class="text-2xl font-semibold text-gray-800 mt-1">{{ stats?.total_llms || 0 }}</p>
                <p class="text-xs text-gray-500 mt-1">Connected models</p>
              </div>
              <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 mb-8">
          <div class="px-6 py-4 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-800">Brand Keyword Search</h2>
                <p class="text-sm text-gray-600">Analyze brand mentions across all LLM providers</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="flex gap-4">
              <div class="flex-1">
                <input
                  v-model="searchKeyword"
                  @keyup.enter="performSearch"
                  type="text"
                  placeholder="Enter brand name or keyword (e.g., 'Netflix', 'Tesla', 'Spotify')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 shadow-sm"
                />
              </div>
              <button
                @click="performSearch"
                :disabled="!searchKeyword.trim() || searchLoading"
                class="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <svg v-if="searchLoading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span class="font-medium">Search</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="searchResults" class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 mb-8">
          <div class="px-6 py-4 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Search Results for "{{ searchResults.keyword }}"</h3>
                <p class="text-sm text-gray-600">Brand analysis across LLM providers</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="text-center p-4 bg-slate-50 rounded-lg border border-gray-200/50">
                <div class="text-3xl font-semibold text-slate-700 mb-1">{{ searchResults.total_mentions }}</div>
                <div class="text-sm font-medium text-gray-600">Total Mentions</div>
              </div>
              <div class="text-center p-4 bg-slate-50 rounded-lg border border-gray-200/50">
                <div class="text-3xl font-semibold text-slate-700 mb-1">{{ searchResults.unique_prompts }}</div>
                <div class="text-sm font-medium text-gray-600">Unique Prompts</div>
              </div>
              <div class="text-center p-4 bg-slate-50 rounded-lg border border-gray-200/50">
                <div class="text-3xl font-semibold text-slate-700 mb-1">{{ searchResults.unique_llms }}</div>
                <div class="text-sm font-medium text-gray-600">LLM Providers</div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-slate-50 rounded-lg p-4 border border-gray-200/50">
                <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Mentions by Provider
                </h4>
                <div class="space-y-2">
                  <div v-for="(count, provider) in searchResults.by_provider" :key="provider" class="flex justify-between items-center p-2 bg-white rounded border border-gray-200/50">
                    <span class="text-sm font-medium text-gray-700 capitalize">{{ provider }}</span>
                    <span class="text-sm font-semibold text-gray-800">{{ count }}</span>
                  </div>
                </div>
              </div>
              <div class="bg-slate-50 rounded-lg p-4 border border-gray-200/50">
                <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Timeline
                </h4>
                <div class="space-y-3">
                  <div class="p-3 bg-white rounded border border-gray-200/50">
                    <div class="text-sm font-medium text-gray-600 mb-1">First Seen</div>
                    <div class="text-sm font-semibold text-gray-800">{{ formatDate(searchResults.first_seen) }}</div>
                  </div>
                  <div class="p-3 bg-white rounded border border-gray-200/50">
                    <div class="text-sm font-medium text-gray-600 mb-1">Last Seen</div>
                    <div class="text-sm font-semibold text-gray-800">{{ formatDate(searchResults.last_seen) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Top Keywords Chart -->
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50">
            <div class="px-6 py-4 border-b border-gray-200/50">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Top Keywords</h3>
                  <p class="text-sm text-gray-600">Most mentioned keywords across all LLM responses</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div v-if="stats?.top_keywords?.length > 0" class="space-y-3">
                <div v-for="(keyword, index) in stats?.top_keywords?.slice(0, 10) || []" :key="keyword.keyword" class="flex items-center p-3 bg-slate-50 rounded-lg border border-gray-200/50 hover:bg-slate-100 transition-colors duration-200">
                  <div class="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-sm font-semibold text-slate-700 mr-3">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-center mb-1">
                      <span class="font-medium text-gray-800">{{ keyword.keyword }}</span>
                      <span class="text-sm text-gray-600">{{ keyword.count }} mentions</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-slate-500 h-2 rounded-full transition-all duration-500" 
                        :style="{ width: `${stats?.top_keywords?.length > 0 ? (keyword.count / (stats.top_keywords?.[0]?.count || 1)) * 100 : 0}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center text-gray-500 py-8">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <p class="font-medium">No keyword data available</p>
                <p class="text-sm">Run some prompts to see keyword analytics</p>
              </div>
            </div>
          </div>

          <!-- Response Trends Chart -->
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50">
            <div class="px-6 py-4 border-b border-gray-200/50">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Response Trends</h3>
                  <p class="text-sm text-gray-600">Daily response count over the last 30 days</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div v-if="stats?.response_trends?.length > 0" class="h-64">
                <canvas ref="trendsChart"></canvas>
              </div>
              <div v-else class="text-center text-gray-500 py-8">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <p class="font-medium">No trend data available</p>
                <p class="text-sm">Response data will appear here over time</p>
              </div>
            </div>
          </div>
        </div>

        <!-- LLM Performance Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 mb-8">
          <div class="px-6 py-4 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">LLM Performance</h3>
                <p class="text-sm text-gray-600">Response statistics by LLM provider</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div v-if="stats?.llm_stats?.length > 0" class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b border-gray-200/50">
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">LLM Provider</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Responses</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unique Prompts</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Avg Tokens</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200/50">
                  <tr v-for="llmStat in stats?.llm_stats || []" :key="llmStat.llm_id" class="hover:bg-slate-50 transition-colors duration-200">
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-6 h-6 bg-slate-200 rounded flex items-center justify-center mr-3">
                          <svg class="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <div class="text-sm font-medium text-gray-800">{{ getLLMName(llmStat.llm_id) }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="text-sm font-semibold text-gray-800">{{ llmStat.total_responses.toLocaleString() }}</span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="text-sm text-gray-700">{{ llmStat.unique_prompts }}</span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="text-sm text-gray-700">{{ Math.round(llmStat.avg_tokens) }}</span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(llmStat.updated_at) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="text-center text-gray-500 py-8">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p class="font-medium">No LLM performance data available</p>
              <p class="text-sm">Connect LLM providers to see performance metrics</p>
            </div>
          </div>
        </div>

        <!-- Prompt Performance Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50">
          <div class="px-6 py-4 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Prompt Performance</h3>
                <p class="text-sm text-gray-600">Response statistics by prompt</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div v-if="stats?.prompt_stats?.length > 0" class="space-y-4">
              <div v-for="promptStat in stats?.prompt_stats?.slice(0, 5) || []" :key="promptStat.prompt_id" class="bg-slate-50 rounded-lg p-4 border border-gray-200/50 hover:bg-slate-100 transition-colors duration-200">
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-medium text-gray-800 leading-relaxed">{{ getPromptTemplate(promptStat.prompt_id) }}</h4>
                  <span class="text-sm font-medium text-gray-600 bg-white px-2 py-1 rounded border border-gray-200/50">{{ promptStat.total_responses }} responses</span>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div class="text-center p-3 bg-white rounded border border-gray-200/50">
                    <div class="text-lg font-semibold text-slate-700 mb-1">{{ promptStat.unique_llms }}</div>
                    <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Unique LLMs</div>
                  </div>
                  <div class="text-center p-3 bg-white rounded border border-gray-200/50">
                    <div class="text-lg font-semibold text-slate-700 mb-1">{{ Math.round(promptStat.avg_tokens) }}</div>
                    <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Avg Tokens</div>
                  </div>
                  <div class="text-center p-3 bg-white rounded border border-gray-200/50">
                    <div class="text-xs font-semibold text-gray-600 mb-1">{{ formatDate(promptStat.updated_at) }}</div>
                    <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Last Updated</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500 py-8">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <p class="font-medium">No prompt performance data available</p>
              <p class="text-sm">Create prompts to see performance analytics</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { apiService, type StatsResponse, type SearchResponse, type LLMResponse, type PromptResponse } from './services/api'
import Chart from 'chart.js/auto'

// Reactive data
const loading = ref(true)
const error = ref('')
const connectionStatus = ref('Connecting...')
const stats = ref<StatsResponse | null>(null)
const llms = ref<LLMResponse[]>([])
const prompts = ref<PromptResponse[]>([])

// Search functionality
const searchKeyword = ref('')
const searchLoading = ref(false)
const searchResults = ref<SearchResponse | null>(null)

// Chart reference
const trendsChart = ref<HTMLCanvasElement | null>(null)

// Methods
const checkConnection = async () => {
  try {
    await apiService.healthCheck()
    connectionStatus.value = 'Connected'
    error.value = ''
  } catch (err) {
    connectionStatus.value = 'Disconnected'
    error.value = err instanceof Error ? err.message : 'Failed to connect to Gego API'
  }
}

const loadData = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Load all data in parallel
    const [statsData, llmsData, promptsData] = await Promise.all([
      apiService.getStats(20),
      apiService.getLLMs(),
      apiService.getPrompts()
    ])
    
    stats.value = statsData
    llms.value = llmsData
    prompts.value = promptsData
    
    // Render chart after data is loaded
    await nextTick()
    renderTrendsChart()
    
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data'
  } finally {
    loading.value = false
  }
}

const refreshData = async () => {
  await checkConnection()
  if (!error.value) {
    await loadData()
  }
}

const performSearch = async () => {
  if (!searchKeyword.value.trim()) return
  
  try {
    searchLoading.value = true
    const results = await apiService.searchKeyword({
      keyword: searchKeyword.value.trim(),
      limit: 100
    })
    searchResults.value = results
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Search failed'
  } finally {
    searchLoading.value = false
  }
}

const renderTrendsChart = () => {
  if (!trendsChart.value || !stats.value?.response_trends.length) return
  
  const ctx = trendsChart.value.getContext('2d')
  if (!ctx) return
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: stats.value.response_trends.map(point => 
        new Date(point.timestamp).toLocaleDateString()
      ),
      datasets: [{
        label: 'Responses',
        data: stats.value.response_trends.map(point => point.count),
        borderColor: 'rgb(100, 116, 139)',
        backgroundColor: 'rgba(100, 116, 139, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(100, 116, 139)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#374151',
          bodyColor: '#6b7280',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          titleFont: {
            size: 13,
            weight: 'normal'
          },
          bodyFont: {
            size: 12
          },
          padding: 8
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 11,
              weight: 'normal'
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(229, 231, 235, 0.5)'
          },
          ticks: {
            precision: 0,
            color: '#6b7280',
            font: {
              size: 11,
              weight: 'normal'
            }
          }
        }
      },
      elements: {
        point: {
          hoverBackgroundColor: 'rgb(100, 116, 139)'
        }
      }
    }
  })
}

const getLLMName = (llmId: string): string => {
  const llm = llms.value.find(l => l.id === llmId)
  return llm ? `${llm.name} (${llm.provider})` : llmId
}

const getPromptTemplate = (promptId: string): string => {
  const prompt = prompts.value.find(p => p.id === promptId)
  return prompt ? prompt.template.substring(0, 100) + (prompt.template.length > 100 ? '...' : '') : promptId
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle
onMounted(async () => {
  await checkConnection()
  if (!error.value) {
    await loadData()
  }
})
</script>