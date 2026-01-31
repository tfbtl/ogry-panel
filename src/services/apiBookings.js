import {
  getBookings as getBookingsAdapter,
  getBooking as getBookingAdapter,
  getBookingsAfterDate as getBookingsAfterDateAdapter,
  getStaysAfterDate as getStaysAfterDateAdapter,
  getStaysTodayActivity as getStaysTodayActivityAdapter,
  updateBooking as updateBookingAdapter,
  deleteBooking as deleteBookingAdapter,
} from "./data/su\u0070abaseAdapter/bookings";

export async function getBookings({ filter, sortBy, page }) {
  return getBookingsAdapter({ filter, sortBy, page });
}

export async function getBooking(id) {
  return getBookingAdapter(id);
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  return getBookingsAfterDateAdapter(date);
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  return getStaysAfterDateAdapter(date);
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  return getStaysTodayActivityAdapter();
}

export async function updateBooking(id, obj) {
  return updateBookingAdapter(id, obj);
}

export async function deleteBooking(id) {
  return deleteBookingAdapter(id);
}
