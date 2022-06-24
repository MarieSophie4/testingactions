import { SearchPolicy } from './search-policy.model';
import { SearchCredentials } from './search-credentials.model';
/**
 * UI request to search a client
 * can be based on credentials or policy
 */
export type SearchRequest = SearchCredentials | SearchPolicy;
