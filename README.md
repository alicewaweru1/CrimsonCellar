# 🍷 Crimson Cellar: Smart Wine Inventory Tracker **[🔗 View Live Demo](https://alicewaweru1.github.io/CrimsonCellar/)**

*Crimson Cellar* is an interactive web application designed to help wine companies move away from manual, error-prone tracking. It provides a real-time dashboard to monitor stock levels, calculate cellar value, and prevent lost sales.

## 📋 The Problem & Solution

### The Challenge
As noted in our initial research, wine companies face significant difficulties tracking inventory accurately:
* *Overstocking:* Tying up capital unnecessarily in popular wines.
* *Stockouts:* Running out of in-demand vintages, leading to lost sales and unhappy customers.
* *Manual Errors:* Tracking via paper or basic spreadsheets is time-consuming and prone to mistakes.

### Our Solution
We developed a web-based tool that:
* *Is Interactive:* Allows users to add, edit, and delete wine stock on the fly.
* *Provides Summaries:* Instantly view total bottle counts and overall inventory value.
* *Automates Alerts:* Features a built-in "Low Stock" warning system to trigger reordering.

## 🚀 Key Features
* *Real-time Inventory Table:* A clean, sortable view of all wine stock.
* *Financial Analytics:* Automatic calculation of total cellar worth based on bottle price and quantity.
* *Low Stock Intelligence:* A visual alert banner that activates when any wine drops below 5 bottles.
* *Responsive Dark/Light Mode:* A premium "Crimson" light theme and a "Deep Onyx" dark theme for high-end aesthetics.
* *Browser Persistence:* Uses localStorage to ensure your data stays saved without needing a backend database.

## 🛠️ Technical Stack
* *HTML5 & JavaScript (ES6+):* For the core logic and DOM manipulation.
* *Tailwind CSS:* For professional, utility-first styling and dark mode support.
* *Git/GitHub:* For version control and project documentation.

## 📂 Project Structure
```text
├── index.html        # Welcome page and feature highlights
├── inventory.html    # Main interactive tracker and dashboard
├── script.js         # Logic for calculations, alerts, and theme switching
└── assets/           # High-quality wine imagery and icons