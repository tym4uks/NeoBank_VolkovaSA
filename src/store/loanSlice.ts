import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoanOffer {
  id: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  insuranceIncluded: boolean;
  salaryClient: boolean;
}

interface LoanState {
  offers: LoanOffer[] | null;
  selectedOffer: LoanOffer | null;
  isPrescoringCompleted: boolean;
  isLoading: boolean;
  isApplicationSent: boolean;
}

const initialState: LoanState = {
  offers: null,
  selectedOffer: null,
  isPrescoringCompleted: false,
  isLoading: false,
  isApplicationSent: false,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<LoanOffer[]>) => {
      const sortedOffers = [...action.payload].sort((a, b) => b.rate - a.rate);
      state.offers = sortedOffers;
      state.isPrescoringCompleted = true;
    },
    selectOffer: (state, action: PayloadAction<LoanOffer>) => {
      state.selectedOffer = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setApplicationSent: (state, action: PayloadAction<boolean>) => {
      state.isApplicationSent = action.payload;
    },
    resetLoan: () => initialState,
  },
});

export const {
  setOffers,
  selectOffer,
  setLoading,
  setApplicationSent,
  resetLoan,
} = loanSlice.actions;
export default loanSlice.reducer;
