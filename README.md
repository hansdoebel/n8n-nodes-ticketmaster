# n8n-nodes-ticketmaster

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

This is a custom n8n community node providing full integration with the **Ticketmaster Discovery API**.

---

## 📚 Table of Contents

- Features
- Installation
- Authentication
- Usage
- Roadmap
- Resources
- Version history

---

## 📁 Features

- ✅ **Discovery API integration** covering all key resources:
  - **Events**
    - Search (`/events`)
    - Get Details (`/events/{id}`)
    - Get Images (`/events/{id}/images`)
  - **Attractions**
    - Search (`/attractions`)
    - Get Details (`/attractions/{id}`)
  - **Classifications**
    - Search (`/classifications`)
    - Get Details (`/classifications/{id}`)
  - **Venues**
    - Search (`/venues`)
    - Get Details (`/venues/{id}`)
- ✅ Complete support for the official Ticketmaster query parameters as “Additional Fields”
- ✅ Displays all results as structured JSON — ready for downstream mapping or transformation
- ✅ Modular, maintainable architecture (each operation is self-contained)
- ✅ Works seamlessly within the n8n editor for no‑code workflows

---

## 📦 Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings → Community Nodes**
2. Select **Install**
3. In the *Install* dialog, enter the npm package name:

   ```bash
   n8n-nodes-ticketmaster
   ```

4. Agree to the notice for third‑party code and click **Install**
5. The new node will appear as **Ticketmaster** in your n8n node list

---

## 🔐 Authentication

**API key authentication**

1. Create a [Ticketmaster Developer Account](https://developer.ticketmaster.com/)
2. Go to **My Apps → Create App**
3. Copy your **API Key**
4. In n8n, open any **Ticketmaster** node and select or create new credentials
5. Paste your API Key into the credentials field

---

## 🚀 Usage

- Use the **Resource** dropdown to select `Event`, `Attraction`, `Classification`, or `Venue`
- Use the **Operation** dropdown to choose the desired action (e.g., *Search*, *Get Details*, etc.)
- Configure filters in **Additional Fields**
- Connect the node to any processing or storage node downstream

Example workflow ideas:
- Search for events by keyword and location  
- Save upcoming concerts to a Google Sheet  
- Fetch venue details for event aggregation  
- Build marketing automations with live Ticketmaster data

---

## 🚧 Roadmap

- [ ] Add pagination support (multi-page fetching)
- [ ] Add caching utilities for high-volume searches
- [ ] Extend to include the **Ticketmaster Commerce API**
- [ ] Add dynamic dropdown options (loadOptions) for dependent filters

---

## 🔗 Resources

- [n8n Website](https://n8n.io/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Ticketmaster Website](https://www.ticketmaster.com/)
- [Ticketmaster API Documentation](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)
- [GitHub Repository](https://github.com/hansdoebel/n8n-nodes-ticketmaster)

---

## 📜 Version history

- `0.0.1` – Initial release
  - Implemented Events, Attractions, Classifications, Venues  
  - Added full query parameter support and single‑page search for all endpoints
