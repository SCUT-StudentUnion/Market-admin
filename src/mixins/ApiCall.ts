import Vue from "vue";
import { ApiError, ErrorCode, logout } from '@/api';

export default Vue.extend({
  data() {
    return {
      loadingCount: 0,
      apiError: null as any
    }
  },
  computed: {
    loading(): Boolean {
      return this.loadingCount > 0;
    }
  },
  methods: {
    async callApi<TData>(callPromise: Promise<TData>) {
      this.loadingCount++;
      this.apiError = null;
      try {
        const result = await callPromise;
        return result;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.code == ErrorCode.InvalidJwt) {
            logout();
            this.$router.replace({ name: 'login' });
            throw error;
          }

          if (this.handleApiError(error.code)) {
            throw error;
          }
        }
        if (error.message)
          this.apiError = error.message;
        else
          this.apiError = error;
        throw error;
      } finally {
        this.loadingCount--;
      }
    },
    handleApiError(errorCode: ErrorCode) {
      // Will overide in components
      return false;
    }
  }
});
