import { action, makeObservable, observable } from "mobx";

class ListingStore {
    pageLimit: number = 0;
    resultsPerPage: number = 0;
    totalPagesResult: number = 0;

    constructor() {
        makeObservable(this, {
            pageLimit: observable,
            totalPagesResult: observable,
            resultsPerPage: observable,
        
            // Region Methods
            setPageLimit: action,
            setTotalPagesResult: action,
            getTotalPagesResults: action,
        });
    }

    setPageLimit = (limit: number) => {
        this.pageLimit = limit;
        return this.pageLimit;
    };

    setTotalPagesResult = (pages: number) => {
        this.totalPagesResult = pages
        return this.totalPagesResult;
    }

    getPageLimit = () => {
        return this.pageLimit;
    }

    getTotalPagesResults = () => {
        return this.totalPagesResult;
    }

}

const listingStore = new ListingStore();

export default listingStore;