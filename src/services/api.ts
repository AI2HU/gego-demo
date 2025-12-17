// API service for communicating with Gego backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8989/api/v1'

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface LLMResponse {
  id: string
  name: string
  provider: string
  model: string
  api_key?: string
  base_url?: string
  config?: Record<string, string>
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface PromptResponse {
  id: string
  template: string
  tags?: string[]
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface ScheduleResponse {
  id: string
  name: string
  prompt_ids: string[]
  llm_ids: string[]
  cron_expr: string
  temperature: number
  enabled: boolean
  last_run?: string
  next_run?: string
  created_at: string
  updated_at: string
}

export interface KeywordCount {
  keyword: string
  count: number
}

export interface TimeSeriesPoint {
  timestamp: string
  count: number
}

export interface PromptStats {
  prompt_id: string
  total_responses: number
  unique_llms: number
  llm_counts: Record<string, number>
  avg_tokens: number
  updated_at: string
}

export interface LLMStats {
  llm_id: string
  total_responses: number
  unique_prompts: number
  prompt_counts: Record<string, number>
  avg_tokens: number
  updated_at: string
}

export interface StatsResponse {
  total_responses: number
  total_prompts: number
  total_llms: number
  total_schedules: number
  top_keywords: KeywordCount[]
  prompt_stats: PromptStats[]
  llm_stats: LLMStats[]
  response_trends: TimeSeriesPoint[]
  last_updated: string
}

export interface URLMentionStats {
  url: string
  title?: string
  search_query?: string
  citations: number
}

export interface DomainMentionStats {
  domain: string
  citations: number
  unique_url_count: number
}

export interface URLStatsResponse {
  top_urls: URLMentionStats[]
  top_domains: DomainMentionStats[]
}

export interface QueryURLItem {
  url: string
  title?: string
  citations: number
}

export interface QueryURLStats {
  query: string
  total_citations: number
  urls: QueryURLItem[]
}

export interface DomainCount {
  domain: string
  count: number
}

export interface KeywordDomainStats {
  keyword: string
  total: number
  domains: DomainCount[]
}

export interface SearchRequest {
  keyword: string
  start_time?: string
  end_time?: string
  limit?: number
}

export interface ResponseItem {
  id: string
  prompt_id: string
  prompt_text: string
  llm_id: string
  llm_name: string
  llm_provider: string
  llm_model?: string
  response_text: string
  temperature?: number
  created_at: string
}

export interface SearchResponse {
  keyword: string
  total_mentions: number
  unique_prompts: number
  unique_llms: number
  by_prompt: Record<string, number>
  by_llm: Record<string, number>
  by_provider: Record<string, number>
  first_seen: string
  last_seen: string
  responses?: ResponseItem[]
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      // Handle network errors and provide more descriptive messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Failed to fetch - Unable to connect to the API server. Please check if the server is running.')
      }
      
      if (error instanceof Error) {
        // Re-throw with more context for common network issues
        if (error.message.includes('ECONNREFUSED')) {
          throw new Error('Connection refused - The API server is not running or not accessible on the expected port.')
        }
        if (error.message.includes('ENOTFOUND')) {
          throw new Error('Host not found - Unable to resolve the API server address.')
        }
        if (error.message.includes('timeout')) {
          throw new Error('Request timeout - The API server is taking too long to respond.')
        }
      }
      
      // Re-throw the original error if it's already an Error instance
      throw error
    }
  }

  // Health check
  async healthCheck(): Promise<APIResponse> {
    return this.request<APIResponse>('/health')
  }

  // LLM endpoints
  async getLLMs(): Promise<LLMResponse[]> {
    const response = await this.request<APIResponse<LLMResponse[]>>('/llms')
    return response.data || []
  }

  async getLLM(id: string): Promise<LLMResponse> {
    const response = await this.request<APIResponse<LLMResponse>>(`/llms/${id}`)
    return response.data!
  }

  // Prompt endpoints
  async getPrompts(): Promise<PromptResponse[]> {
    const response = await this.request<PaginatedResponse<PromptResponse>>('/prompts')
    return response.data || []
  }

  async getPrompt(id: string): Promise<PromptResponse> {
    const response = await this.request<APIResponse<PromptResponse>>(`/prompts/${id}`)
    return response.data!
  }

  // Stats endpoint
  async getStats(keywordLimit?: number): Promise<StatsResponse> {
    const params = keywordLimit ? `?keyword_limit=${keywordLimit}` : ''
    const response = await this.request<APIResponse<StatsResponse>>(`/stats${params}`)
    return response.data!
  }

  async getURLStats(limit?: number): Promise<URLStatsResponse> {
    const params = limit ? `?limit=${limit}` : ''
    const response = await this.request<APIResponse<URLStatsResponse>>(`/stats/urls${params}`)
    return response.data!
  }

  async getQueryURLStats(limit?: number): Promise<QueryURLStats[]> {
    const params = limit ? `?limit=${limit}` : ''
    const response = await this.request<APIResponse<QueryURLStats[]>>(`/stats/query-urls${params}`)
    return response.data || []
  }

  async getKeywordDomainMatrix(keywordLimit?: number, domainLimit?: number): Promise<KeywordDomainStats[]> {
    const searchParams = new URLSearchParams()
    if (keywordLimit) {
      searchParams.set('keyword_limit', String(keywordLimit))
    }
    if (domainLimit) {
      searchParams.set('domain_limit', String(domainLimit))
    }
    const query = searchParams.toString()
    const response = await this.request<APIResponse<KeywordDomainStats[]>>(
      `/stats/keyword-domains${query ? `?${query}` : ''}`
    )
    return response.data || []
  }

  // Search endpoint
  async searchKeyword(request: SearchRequest): Promise<SearchResponse> {
    const response = await this.request<APIResponse<SearchResponse>>('/search', {
      method: 'POST',
      body: JSON.stringify(request),
    })
    return response.data!
  }
}

export const apiService = new ApiService()
