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
            <nav class="hidden md:flex items-center space-x-4">
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
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200/50 pt-4 pb-4">
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
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <!-- Hero Section -->
      <div class="text-center mb-8 md:mb-16">
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">What is Gego?</h1>
        <p class="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          An on-premise Generative Engine Optimization (GEO) system that tracks brand mentions and keyword visibility across multiple Large Language Models
        </p>
      </div>

      <!-- Overview Section -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-4 md:p-8 mb-6 md:mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <i class="pi pi-info-circle text-slate-600 text-xl mr-2"></i>
          Overview
        </h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          Gego is an open-source, on-premise GEO (Generative Engine Optimization) tracker designed to help you understand how your brand, products, and keywords are mentioned by AI assistants across different Large Language Model providers.
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          By scheduling prompts across multiple LLMs and automatically extracting keywords from their responses, Gego provides comprehensive analytics on keyword visibility, brand mentions, and competitive intelligence.
        </p>
        <p class="text-gray-700 leading-relaxed">
          As an on-premise solution, Gego runs entirely on your infrastructure, giving you complete control over your data, ensuring privacy, and eliminating dependency on external services.
        </p>
      </div>

      <!-- Key Features -->
      <div class="mb-6 md:mb-8">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 flex items-center">
          <i class="pi pi-check-circle text-slate-600 text-xl mr-2"></i>
          Key Features
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <i class="pi pi-server text-blue-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Multi-LLM Support</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Works with OpenAI, Anthropic, Ollama, Google, Perplexity, and custom LLM providers. Track your brand across all major AI platforms.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <i class="pi pi-chart-bar text-green-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Comprehensive Analytics</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Track keyword mentions, compare prompts and LLMs, view trends, and analyze response patterns with detailed statistics and visualizations.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <i class="pi pi-clock text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Flexible Scheduling</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Cron-based scheduler for automated prompt execution. Set up recurring prompts to continuously monitor your brand mentions across time.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <i class="pi pi-lightbulb text-yellow-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Automatic Keyword Extraction</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Intelligently extracts keywords from responses without predefined lists. No manual keyword management needed.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <i class="pi pi-code text-indigo-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Pluggable Architecture</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Easy to add new LLM providers and database backends. Extensible design for custom integrations and workflows.
            </p>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <i class="pi pi-shield text-teal-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">On-Premise Deployment</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Deploy and run entirely on your infrastructure. Complete data control, privacy compliance, and no dependency on external services.
            </p>
          </div>
        </div>
      </div>

      <!-- Use Cases -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-4 md:p-8 mb-6 md:mb-8">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 flex items-center">
          <i class="pi pi-clipboard text-slate-600 text-xl mr-2"></i>
          Use Cases
        </h2>
        <div class="space-y-4">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <span class="text-slate-600 font-semibold text-sm">1</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">SEO/Marketing Research</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Track how brands and keywords are mentioned by AI assistants. Understand your brand's visibility in the AI landscape.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <span class="text-slate-600 font-semibold text-sm">2</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Competitive Analysis</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Compare keyword visibility across different LLMs. See how competitors are positioned in AI-generated responses.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <span class="text-slate-600 font-semibold text-sm">3</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Prompt Engineering</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Identify which prompts generate the most keyword mentions. Optimize your prompts for better brand visibility.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <span class="text-slate-600 font-semibold text-sm">4</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Trend Analysis</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Monitor changes in keyword mentions over time. Track brand visibility trends across different AI platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-4 md:p-8 mb-6 md:mb-8">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 flex items-center">
          <i class="pi pi-question-circle text-slate-600 text-xl mr-2"></i>
          Frequently Asked Questions
        </h2>
        <div class="space-y-4 md:space-y-6">
          <div class="border-b border-gray-200/50 pb-4 md:pb-6 last:border-b-0 last:pb-0">
            <h3 class="text-base md:text-lg font-semibold text-gray-800 mb-2">What is Gego for?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Gego is designed to track LLM output trends for companies and individuals. It helps you monitor how your brand, products, or keywords are mentioned across different Large Language Model providers, giving you insights into your visibility in the AI landscape.
            </p>
          </div>

          <div class="border-b border-gray-200/50 pb-4 md:pb-6 last:border-b-0 last:pb-0">
            <h3 class="text-base md:text-lg font-semibold text-gray-800 mb-2">Why is Gego GPL-3.0 licensed?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              LLMs are trained on our data. Gego is a form of retribution, allowing you to exploit how that data is used for your own interest. By making it open-source under GPL-3.0, we empower everyone to understand and track their presence in AI-generated content.
            </p>
          </div>

          <div class="border-b border-gray-200/50 pb-4 md:pb-6 last:border-b-0 last:pb-0">
            <h3 class="text-base md:text-lg font-semibold text-gray-800 mb-2">Why would I need Gego?</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Gego is a tool to track how you're referenced across LLM providers. Whether you're a company monitoring brand mentions or an individual tracking your online presence, Gego provides comprehensive analytics on how AI assistants perceive and mention your brand or keywords.
            </p>
          </div>

          <div class="border-b border-gray-200/50 pb-4 md:pb-6 last:border-b-0 last:pb-0">
            <h3 class="text-base md:text-lg font-semibold text-gray-800 mb-2">Is it like SEO?</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-3">
              While SEO is still a valuable metric to track your online presence, GEO (Generative Engine Optimization) is fundamentally different. The foundation of SEO is how well you're indexed on search engines. The foundation of GEO is how well you're indexed on LLM outputs.
            </p>
            <p class="text-gray-600 text-sm leading-relaxed">
              However, it's important to note that LLMs often use search engines to generate their responses, so SEO remains an interesting and relevant metric to monitor alongside GEO.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl shadow-lg p-6 md:p-8 text-center text-white">
        <h2 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Ready to Get Started?</h2>
        <p class="text-sm md:text-base text-slate-200 mb-4 md:mb-6 max-w-2xl mx-auto px-2">
          Gego is open-source and available on GitHub. Start tracking your brand mentions across AI platforms today.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <a
            href="https://github.com/AI2HU/gego"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 bg-white text-slate-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm md:text-base"
          >
            <i class="pi pi-github text-lg"></i>
            <span>View on GitHub</span>
          </a>
          <router-link
            to="/"
            class="px-6 py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-400 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm md:text-base"
          >
            <i class="pi pi-chart-bar text-lg"></i>
            <span>View Dashboard</span>
          </router-link>
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)
</script>

