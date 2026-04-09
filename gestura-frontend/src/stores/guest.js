import { ref } from "vue";

export const showGuestOverlay = ref(false)

export function triggerGuestOverlay() {
    showGuestOverlay.value = true
}

export function closeGuestOverlay() {
    showGuestOverlay.value = false
}