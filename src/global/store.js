import { create } from 'zustand'

export const useStore = create((set) => ({
  isLoggedIn: false,
  setLoggedIn: (login) => set(() => ({ isLoggedIn: login })),
  isAdmin: false,
  setAdmin: (admin) => set(() => ({ isAdmin: admin })),
  authRefreshing: true,
  setAuthRefreshing: (refresh) => set(() => ({ authRefreshing: refresh })),
  actionLoading: false,
  setActionLoading: (loading) => set(() => ({ actionLoading: loading })),
}))

export const reauthStore = create((set) => ({
  reauthFormState: {
    email: '',
    password: '',
  },
  setReauthFormState: (form) => set(() => ({ reauthFormState: form })),
}))

export const usePaymentStore = create((set) => ({
  // paymentFormState: {
  //   lokasi: '',
  //   tanggal: [null, null],
  //   metode: '',
  //   bukti: '',
  // },
  // setPaymentFormState: (form) => set(() => ({ paymentFormState: form })),
  lokasi: '',
  tanggal: [null, null],
  metode: '',
  bukti: '',
}))

// export const useOverlayPending = create((set)=>{
//   overlayPending
// })
