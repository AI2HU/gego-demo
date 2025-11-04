<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white/60 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4 md:py-6">
          <div class="flex items-center space-x-2 md:space-x-4">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center shadow-sm">
              <i class="pi pi-desktop text-white text-lg md:text-xl"></i>
            </div>
            <div>
              <h1 class="text-lg md:text-2xl font-semibold text-gray-800">Gego Analytics</h1>
              <p class="hidden md:block text-sm text-gray-500">Generative Engine Optimization Platform</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 md:space-x-4">
            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center space-x-2 mr-4">
              <router-link
                to="/"
                class="px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                :class="route.path === '/' ? 'bg-slate-600 text-white hover:bg-slate-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'"
              >
                Dashboard
              </router-link>
              <router-link
                to="/what-is-gego"
                class="px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                :class="route.path === '/what-is-gego' ? 'bg-slate-600 text-white hover:bg-slate-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'"
              >
                What is Gego
              </router-link>
            </nav>
            <!-- Desktop Status and Refresh -->
            <div class="hidden md:flex items-center px-3 py-1.5 bg-green-50 rounded-lg border border-green-200/50">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span class="text-sm font-medium text-green-700">{{ connectionStatus }}</span>
            </div>
            <button 
              @click="refreshData"
              :disabled="loading"
              class="hidden md:flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200 font-medium text-sm"
            >
              <i v-if="loading" class="pi pi-spin pi-spinner text-base"></i>
              <i v-else class="pi pi-refresh text-base"></i>
              <span>Refresh</span>
            </button>
            <!-- Mobile Menu Button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <i v-if="!mobileMenuOpen" class="pi pi-bars text-xl"></i>
              <i v-else class="pi pi-times text-xl"></i>
            </button>
          </div>
        </div>
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200/50 pt-4 pb-4 space-y-3">
          <nav class="flex flex-col space-y-2">
            <router-link
              to="/"
              @click="mobileMenuOpen = false"
              class="px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
              :class="route.path === '/' ? 'bg-slate-600 text-white' : 'text-gray-700 hover:bg-gray-100'"
            >
              Dashboard
            </router-link>
            <router-link
              to="/what-is-gego"
              @click="mobileMenuOpen = false"
              class="px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
              :class="route.path === '/what-is-gego' ? 'bg-slate-600 text-white' : 'text-gray-700 hover:bg-gray-100'"
            >
              What is Gego
            </router-link>
          </nav>
          <div class="flex items-center justify-between pt-2 border-t border-gray-200/50">
            <div class="flex items-center px-3 py-1.5 bg-green-50 rounded-lg border border-green-200/50">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span class="text-xs font-medium text-green-700">{{ connectionStatus }}</span>
            </div>
            <button 
              @click="refreshData"
              :disabled="loading"
              class="flex items-center space-x-2 px-3 py-1.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all duration-200 font-medium text-xs"
            >
              <i v-if="loading" class="pi pi-spin pi-spinner text-sm"></i>
              <i v-else class="pi pi-refresh text-sm"></i>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      <!-- Error Alert -->
      <div v-if="error" class="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i class="pi pi-times-circle text-red-600 text-xl"></i>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-lg font-semibold text-red-800 mb-2">Unable to Connect to Gego API</h3>
            <div class="text-sm text-red-700 space-y-2">
              <p class="font-medium">{{ getErrorMessage() }}</p>
              <div class="mt-4 flex items-center space-x-3">
                <button 
                  @click="refreshData"
                  :disabled="loading"
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm font-medium transition-colors duration-200"
                >
                  <i v-if="loading" class="pi pi-spin pi-spinner text-base"></i>
                  <i v-else class="pi pi-refresh text-base"></i>
                  <span>Retry Connection</span>
                </button>
                <a 
                  href="https://github.com/AI2HU/gego" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2 text-sm font-medium transition-colors duration-200"
                >
                  <i class="pi pi-github text-base"></i>
                  <span>View Documentation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !stats" class="flex justify-center items-center py-16">
        <div class="text-center">
          <div class="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <i class="pi pi-spin pi-spinner text-slate-600 text-2xl"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-700 mb-1">Loading Analytics</h3>
          <p class="text-gray-500">Fetching data from your LLM providers...</p>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-if="stats && !loading">
        <!-- Overview Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Responses</p>
                <p class="text-2xl font-semibold text-gray-800 mt-1">{{ stats?.total_responses?.toLocaleString() || 0 }}</p>
                <p class="text-xs text-gray-500 mt-1">Across all LLMs</p>
              </div>
              <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <i class="pi pi-file text-slate-600 text-xl"></i>
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
                <i class="pi pi-lightbulb text-slate-600 text-xl"></i>
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
                <i class="pi pi-server text-slate-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 mb-8">
          <div class="px-6 py-4 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <i class="pi pi-search text-slate-600 text-base"></i>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-800">Brand Keyword Search</h2>
                <p class="text-sm text-gray-600">Analyze brand mentions across all LLM providers</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div class="flex-1">
                <input
                  v-model="searchKeyword"
                  @keyup.enter="performSearch"
                  type="text"
                  placeholder="Enter brand name or keyword (e.g., 'Netflix', 'Tesla', 'Spotify')"
                  class="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 shadow-sm text-sm md:text-base"
                />
              </div>
              <button
                @click="performSearch"
                :disabled="!searchKeyword.trim() || searchLoading"
                class="w-full sm:w-auto px-6 py-2 md:py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transition-all duration-200 text-sm md:text-base"
              >
                <i v-if="searchLoading" class="pi pi-spin pi-spinner text-base"></i>
                <i v-else class="pi pi-search text-base"></i>
                <span class="font-medium">Search</span>
              </button>
            </div>
            
            <!-- Trending Keywords -->
            <div v-if="stats?.top_keywords && stats.top_keywords.length > 0" class="mt-4">
              <div class="flex items-center mb-2">
                <i class="pi pi-chart-line text-gray-500 text-sm mr-2"></i>
                <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Trending Keywords</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="keyword in stats.top_keywords.slice(0, 10)"
                  :key="keyword.keyword"
                  @click="searchWithKeyword(keyword.keyword)"
                  class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-gray-700 hover:text-gray-900 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 border border-transparent hover:border-slate-300 shadow-sm hover:shadow"
                  :class="{ 'bg-slate-200 border-slate-300': searchKeyword === keyword.keyword }"
                >
                  <span>{{ keyword.keyword }}</span>
                  <span class="text-xs text-gray-500">({{ keyword.count }})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="searchResults" class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 mb-8">
          <div class="px-6 py-4 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <i class="pi pi-check-circle text-green-600 text-base"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Search Results for "{{ searchResults.keyword }}"</h3>
                <p class="text-sm text-gray-600">Brand analysis across LLM providers</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6">
              <div class="text-center p-4 bg-slate-50 rounded-lg border border-gray-200/50">
                <div class="text-2xl md:text-3xl font-semibold text-slate-700 mb-1">{{ searchResults.total_mentions }}</div>
                <div class="text-xs md:text-sm font-medium text-gray-600">Total Mentions</div>
              </div>
              <div class="text-center p-4 bg-slate-50 rounded-lg border border-gray-200/50">
                <div class="text-2xl md:text-3xl font-semibold text-slate-700 mb-1">{{ searchResults.unique_prompts }}</div>
                <div class="text-xs md:text-sm font-medium text-gray-600">Unique Prompts</div>
              </div>
              <div class="text-center p-4 bg-slate-50 rounded-lg border border-gray-200/50">
                <div class="text-2xl md:text-3xl font-semibold text-slate-700 mb-1">{{ searchResults.unique_llms }}</div>
                <div class="text-xs md:text-sm font-medium text-gray-600">LLM Providers</div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-slate-50 rounded-lg p-4 border border-gray-200/50">
                <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                  <i class="pi pi-chart-bar text-slate-600 text-sm mr-2"></i>
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
                  <i class="pi pi-clock text-slate-600 text-sm mr-2"></i>
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

            <!-- Responses List -->
            <div v-if="searchResults.responses && searchResults.responses.length > 0" class="mt-6">
              <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
                <i class="pi pi-file text-slate-600 text-base mr-2"></i>
                Responses ({{ searchResults.responses.length }})
              </h4>
              <div class="space-y-4">
                <div v-for="(response, index) in searchResults.responses" :key="response.id || index" class="bg-slate-50 rounded-lg p-4 border border-gray-200/50 hover:bg-slate-100 transition-colors duration-200">
                  <!-- Header with Model and Temperature -->
                  <div class="flex items-start justify-between mb-3 pb-3 border-b border-gray-200/50">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3 mb-2">
                        <div class="px-3 py-1 bg-white rounded-lg border border-gray-200/50">
                          <span class="text-sm font-semibold text-gray-700 capitalize">{{ response.llm_provider }}</span>
                        </div>
                        <div class="px-3 py-1 bg-white rounded-lg border border-gray-200/50">
                          <span class="text-sm font-medium text-gray-700">{{ response.llm_model || response.llm_name || 'Unknown Model' }}</span>
                        </div>
                        <div v-if="response.temperature !== undefined" class="px-3 py-1 bg-white rounded-lg border border-gray-200/50">
                          <span class="text-sm text-gray-600">Temperature: </span>
                          <span class="text-sm font-semibold text-gray-800">{{ response.temperature.toFixed(2) }}</span>
                        </div>
                        <div class="px-3 py-1 bg-white rounded-lg border border-gray-200/50">
                          <span class="text-xs text-gray-500">{{ formatDate(response.created_at) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Prompt -->
                  <div class="mb-3">
                    <div class="flex items-center mb-2">
                      <i class="pi pi-lightbulb text-slate-500 text-sm mr-2"></i>
                      <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Prompt</span>
                    </div>
                    <div class="p-3 bg-white rounded-lg border border-gray-200/50">
                      <p class="text-sm text-gray-700 leading-relaxed">{{ response.prompt_text }}</p>
                    </div>
                  </div>

                  <!-- Response with Highlighted Keyword -->
                  <div>
                    <div class="flex items-center mb-2">
                      <i class="pi pi-comment text-slate-500 text-sm mr-2"></i>
                      <span class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Response</span>
                    </div>
                    <div class="p-3 bg-white rounded-lg border border-gray-200/50">
                      <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap" v-html="highlightKeyword(response.response_text, searchResults.keyword)"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="searchResults && searchResults.responses !== undefined && searchResults.responses.length === 0" class="mt-6 text-center py-8 bg-slate-50 rounded-lg border border-gray-200/50">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i class="pi pi-file text-gray-400 text-2xl"></i>
              </div>
              <p class="font-medium text-gray-600">No responses found</p>
              <p class="text-sm text-gray-500 mt-1">The keyword "{{ searchResults.keyword }}" was not found in any responses</p>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <!-- Top Keywords Chart -->
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50">
            <div class="px-6 py-4 border-b border-gray-200/50">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <i class="pi pi-tag text-slate-600 text-base"></i>
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
                  <i class="pi pi-file text-gray-400 text-2xl"></i>
                </div>
                <p class="font-medium">No keyword data available</p>
                <p class="text-sm">Run some prompts to see keyword analytics</p>
              </div>
            </div>
          </div>

          <!-- Provider Distribution -->
          <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50">
            <div class="px-6 py-4 border-b border-gray-200/50">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <i class="pi pi-server text-slate-600 text-base"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Provider Distribution</h3>
                  <p class="text-sm text-gray-600">Response distribution across LLM providers</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div v-if="stats?.llm_stats && stats.llm_stats.length > 0" class="space-y-4">
                <div v-for="llmStat in getProviderDistribution()" :key="llmStat.provider" class="bg-slate-50 rounded-lg p-4 border border-gray-200/50 hover:bg-slate-100 transition-colors duration-200">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                        <i class="pi pi-server text-slate-600 text-base"></i>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-800 capitalize">{{ llmStat.provider }}</h4>
                        <p class="text-xs text-gray-500">{{ llmStat.modelCount }} model{{ llmStat.modelCount !== 1 ? 's' : '' }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-semibold text-slate-700">{{ llmStat.totalResponses.toLocaleString() }}</div>
                      <div class="text-xs text-gray-500">responses</div>
                    </div>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      class="bg-slate-500 h-3 rounded-full transition-all duration-500" 
                      :style="{ width: `${llmStat.percentage}%` }"
                    ></div>
                  </div>
                  <div class="flex justify-between items-center text-xs text-gray-600">
                    <span>{{ llmStat.percentage.toFixed(1) }}% of total</span>
                    <span>Avg {{ Math.round(llmStat.avgTokens) }} tokens</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center text-gray-500 py-8">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i class="pi pi-server text-gray-400 text-2xl"></i>
                </div>
                <p class="font-medium">No provider data available</p>
                <p class="text-sm">Run some prompts to see provider distribution</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Prompt Performance Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50">
          <div class="px-6 py-4 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <i class="pi pi-lightbulb text-slate-600 text-base"></i>
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
                <div class="grid grid-cols-3 gap-2 md:gap-4">
                  <div class="text-center p-2 md:p-3 bg-white rounded border border-gray-200/50">
                    <div class="text-base md:text-lg font-semibold text-slate-700 mb-1">{{ promptStat.unique_llms }}</div>
                    <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Unique LLMs</div>
                  </div>
                  <div class="text-center p-2 md:p-3 bg-white rounded border border-gray-200/50">
                    <div class="text-base md:text-lg font-semibold text-slate-700 mb-1">{{ Math.round(promptStat.avg_tokens) }}</div>
                    <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Avg Tokens</div>
                  </div>
                  <div class="text-center p-2 md:p-3 bg-white rounded border border-gray-200/50">
                    <div class="text-xs font-semibold text-gray-600 mb-1">{{ formatDate(promptStat.updated_at) }}</div>
                    <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Last Updated</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500 py-8">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i class="pi pi-lightbulb text-gray-400 text-2xl"></i>
              </div>
              <p class="font-medium">No prompt performance data available</p>
              <p class="text-sm">Create prompts to see performance analytics</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white/60 backdrop-blur-md border-t border-gray-200/50 mt-8 md:mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex items-center space-x-2 md:space-x-4">
            <div class="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <i class="pi pi-desktop text-white text-lg"></i>
            </div>
            <div>
              <p class="text-xs md:text-sm font-medium text-gray-800">Gego Analytics Demo</p>
              <p class="text-xs text-gray-500 hidden sm:block">Demo for <a href="https://github.com/AI2HU/gego" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-slate-800 underline">Gego - GEO System</a></p>
            </div>
          </div>
          
          <div class="flex items-center space-x-6">
            <a 
              href="https://github.com/AI2HU/gego" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <i class="pi pi-github text-base"></i>
              <span>View Source</span>
            </a>
            
            <a 
              href="https://github.com/AI2HU/gego/blob/main/CONTRIBUTING.md" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <i class="pi pi-book text-base"></i>
              <span>Contribute</span>
            </a>
            
            <div class="flex items-center space-x-2 text-xs text-gray-500">
              <span>Open Source</span>
              <i class="pi pi-check-circle text-green-500 text-xs"></i>
            </div>
          </div>
        </div>
        
        <div class="mt-6 pt-6 border-t border-gray-200/50">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p class="text-xs text-gray-500">
              Made with ⏰ for the open-source community
            </p>
            <p class="text-xs text-gray-500">
              Licensed under <a href="https://github.com/AI2HU/gego/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-slate-800 underline">GPL-3.0</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { apiService, type StatsResponse, type SearchResponse, type ResponseItem, type LLMResponse, type PromptResponse } from '../services/api'

const route = useRoute()

// Reactive data
const loading = ref(true)
const error = ref('')
const connectionStatus = ref('Connecting...')
const stats = ref<StatsResponse | null>(null)
const llms = ref<LLMResponse[]>([])
const prompts = ref<PromptResponse[]>([])
const mobileMenuOpen = ref(false)

// Search functionality
const searchKeyword = ref('')
const searchLoading = ref(false)
const searchResults = ref<SearchResponse | null>(null)


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
      limit: 50
    })
    searchResults.value = results
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Search failed'
  } finally {
    searchLoading.value = false
  }
}

const searchWithKeyword = (keyword: string) => {
  searchKeyword.value = keyword
  performSearch()
}

const getLLMName = (llmId: string): string => {
  const llm = llms.value.find(l => l.id === llmId)
  return llm ? `${llm.name} (${llm.provider})` : llmId
}

const getProviderDistribution = () => {
  if (!stats.value?.llm_stats || stats.value.llm_stats.length === 0) {
    return []
  }

  const providerMap = new Map<string, { provider: string; totalResponses: number; totalTokens: number; modelCount: number; models: Set<string> }>()
  const totalResponses = stats.value.llm_stats.reduce((sum, stat) => sum + stat.total_responses, 0)

  stats.value.llm_stats.forEach(stat => {
    const llm = llms.value.find(l => l.id === stat.llm_id)
    const provider = llm?.provider || 'unknown'
    
    if (!providerMap.has(provider)) {
      providerMap.set(provider, {
        provider,
        totalResponses: 0,
        totalTokens: 0,
        modelCount: 0,
        models: new Set()
      })
    }
    
    const providerStat = providerMap.get(provider)!
    providerStat.totalResponses += stat.total_responses
    providerStat.totalTokens += stat.avg_tokens * stat.total_responses
    if (llm?.model) {
      providerStat.models.add(llm.model)
    }
    providerStat.modelCount = providerStat.models.size
  })

  return Array.from(providerMap.values())
    .map(stat => ({
      provider: stat.provider,
      totalResponses: stat.totalResponses,
      avgTokens: stat.totalResponses > 0 ? stat.totalTokens / stat.totalResponses : 0,
      modelCount: stat.modelCount,
      percentage: totalResponses > 0 ? (stat.totalResponses / totalResponses) * 100 : 0
    }))
    .sort((a, b) => b.totalResponses - a.totalResponses)
}

const getPromptTemplate = (promptId: string): string => {
  const prompt = prompts.value.find(p => p.id === promptId)
  return prompt ? prompt.template.substring(0, 100) + (prompt.template.length > 100 ? '...' : '') : promptId
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const highlightKeyword = (text: string, keyword: string): string => {
  if (!keyword || !text) return text
  
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 text-gray-900 font-semibold px-1 rounded">$1</mark>')
}

const getErrorMessage = (): string => {
  if (!error.value) return ''
  
  // Check for specific error types and provide user-friendly messages
  if (error.value.includes('Failed to fetch') || error.value.includes('NetworkError')) {
    return 'The Gego API server appears to be offline or unreachable.'
  }
  
  if (error.value.includes('ECONNREFUSED') || error.value.includes('Connection refused')) {
    return 'Connection refused - the API server is not running or not accessible.'
  }
  
  if (error.value.includes('timeout') || error.value.includes('TIMEOUT')) {
    return 'Request timed out - the API server is taking too long to respond.'
  }
  
  if (error.value.includes('404')) {
    return 'API endpoint not found - please check the server configuration.'
  }
  
  if (error.value.includes('500')) {
    return 'Internal server error - there may be an issue with the API server.'
  }
  
  if (error.value.includes('403') || error.value.includes('401')) {
    return 'Authentication failed - please check your API credentials.'
  }
  
  // Default message for other errors
  return error.value
}


// Lifecycle
onMounted(async () => {
  await checkConnection()
  if (!error.value) {
    await loadData()
  }
})
</script>