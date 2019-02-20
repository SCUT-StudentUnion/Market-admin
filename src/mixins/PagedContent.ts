import ApiCall from "./ApiCall";
import { PageResult } from '@/api';

export default ApiCall.extend({
  data() {
    return {
      totalPages: 0,
      currentPage: 0,
      pageLoading: false,
      content: null as Object[] | null,
      pageRequestId: 0
    }
  },
  watch: {
    currentPage() {
      this.loadPage();
    },
  },
  methods: {
    doLoadPage(): Promise<PageResult<Object>> {
      throw "Must be overrided";
    },
    async loadPage() {
      const currentRequestId = ++this.pageRequestId;
      this.pageLoading = true;
      try {
        const result = await this.callApi(this.doLoadPage())
        if (currentRequestId != this.pageRequestId) {
          return; // another request has started
        }
        this.totalPages = result.totalPages;
        this.content = result.content;
      } catch (e) {
        // Do nothing
      } finally {
        this.pageLoading = false;
      }
    }
  }
});
