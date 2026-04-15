console.log("[Upwork CRM Sync] Extension initialized on Upwork messages page.");

// Identify the CRM API host endpoint
const CRM_API_ENDPOINT = "http://localhost:3000/api/sync";

// Simple MutationObserver to detect new incoming messages
const observer = new MutationObserver((mutations) => {
    // In a real implementation, we would selectively parse the mutations
    // for specific class names associated with Upwork's unread badges or incoming message bubbles.
    mutations.forEach(mutation => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            // Placeholder: Check if the added node corresponds to an unread message badge
            // e.g. if (mutation.target.classList.contains('unread-badge')) 
            // extractClientInfo() -> syncWithCRM()
            
            // console.log("Potential DOM update detected in chat layout", mutation.target);
        }
    });
});

// Start observing the body or the specific chat container
// Will need actual classes from Upwork DOM elements during active testing
window.onload = () => {
    const chatContainer = document.body; // Replace with precise selector like '.chat-list-sidebar'
    if (chatContainer) {
        observer.observe(chatContainer, {
            childList: true,
            subtree: true
        });
        console.log("[Upwork CRM Sync] MutationObserver attached to DOM.");
    }
};

async function syncWithCRM(clientName, messageDate) {
    try {
        const response = await fetch(CRM_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientName: clientName,
                lastReplyAt: messageDate
            })
        });
        
        if (response.ok) {
            console.log("[Upwork CRM Sync] Successfully synced with CRM");
        }
    } catch (e) {
        console.error("[Upwork CRM Sync] Failed to sync with CRM. Is the local app running?", e);
    }
}
