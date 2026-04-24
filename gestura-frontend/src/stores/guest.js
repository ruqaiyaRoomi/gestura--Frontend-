import { ref } from "vue";

// global reactive flag, contols visibility if the guest overlay across the app
export const showGuestOverlay = ref(false)

// call this anywhere to show the guest overlay
export function triggerGuestOverlay() {
    showGuestOverlay.value = true
}

// call this to dimiss the guest overlay
export function closeGuestOverlay() {
    showGuestOverlay.value = false
}