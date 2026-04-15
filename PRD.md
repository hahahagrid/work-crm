# Product Requirements Document: Sales CRM & Upwork Monitor

## 1. Project Overview
A custom CRM system designed specifically for a sales team working heavily with platforms like Upwork. The system provides automated tracking of lead/client follow-ups ("pings") and aims to automate the detection of client replies to reset tracking counters, eliminating manual data entry in spreadsheets.

## 2. Core Features & Business Logic
### 2.1. Ping (Follow-up) Tracking
*   **Initial Ping:** Triggered 3 days after the last message sent by the sales team if the client has not responded.
*   **Second Ping:** Triggered 7 days after the first ping (on the 10th day overall) if the client still has not responded.
*   **Counter Reset:** If the client replies at any point, the ping timeline is reset, and the lead status updates automatically.
*   **Manual Override:** Sales team members must be able to manually update a lead's status (e.g., if a reply occurs outside the tracked platform, such as via a mobile app).

### 2.2. Automated Reply Monitoring (Browser Extension)
*   **Platform:** Upwork (initially), potentially scalable to others.
*   **Safety Requirements:** Must operate without triggering Upwork's anti-bot protections (avoid rapid API scraping or unnatural actions).
*   **Core Function:** Detect when a client has sent a new message in a specific chat or across the active chat list.
*   **Data Sync:** Send identified activity back to the central CRM server to update the status and reset the ping counter.

### 2.3. CRM Dashboard
*   **Lead View:** Table/Kanban view showing all leads, sorted by "Next Ping Date".
*   **Notifications:** Alerts for leads that require an immediate ping today.
*   **Lead Details:** Platform link (e.g., Upwork room link), client name, last contact date, ping status.

## 3. Technical Constraints & Open Questions
### 3.1. Browser Extension Strategy
*   *How to monitor without getting banned:* 
    *   **Option A (Active DOM Monitoring):** Injecting a content script into `upwork.com/messages` that sets MutationObservers on the DOM elements of the chat list or the active chat to detect new incoming messages.
    *   **Option B (Network Request Interception):** Monitoring WebSockets/XHR responses in the background script to detect incoming message payloads (invisible to DOM but might be complex if encypted/obfuscated).
    *   **Option C (Silent Screenshot/OCR):** *Not recommended* — highly resource-intensive and error-prone compared to DOM reading.
*   *Trigger mechanism:* Does it scan the global chat list or only update when the user physically clicks into a specific chat? Scanning the chat list DOM silently is preferable to ensure all chats are up to date.
*   *Mobile Problem:* Upwork messages sent or received on the Upwork mobile app will not be tracked by the Chrome extension until the user opens Upwork on their desktop browser (where the extension is installed) and the chat list is rendered.

## 4. Phase 1: MVP Scope
1.  **Backend CRM:** A simple application (Next.js + Database) to manage leads, calculate next ping dates, and provide a UI for the sales team.
2.  **API Endpoint:** A secure endpoint on the CRM to receive updates from the extension.
3.  **Chrome Extension:** A content script that parses the Upwork messages web interface and pings the CRM when client messages are detected.
