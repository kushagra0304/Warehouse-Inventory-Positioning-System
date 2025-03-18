## Warehouse Inventory Positioning System

## Problem Statement

- In medium or large scale warehouses and manufacturing facilities, locating and tracking inventory—whether raw materials (Kraft paper reels) or finished goods (corrugated boxes)—is a challenge.
- Traditional inventory management systems often rely on manual tracking, periodic audits, or barcode-based tracking, which are time consuming and error-prone.
- As inventory volume grows, locating items becomes difficult, leading to delays and misplaced inventory.
- It is not feasible for facilities to operate like this under heavy workload or operational problems.

## Solution Overview

- The proposed solution uses Passive Ultra-Wideband (UWB) tags to track inventory efficiently. These battery-free tags reflect UWB signals, enabling precise location tracking within a 10-meter radius. By attaching them to materials and finished goods, inventory movement can be monitored in real time using scanners that locate and log tag positions. The system forms an IoT network, with data transmitted to a cloud platform for seamless stock management without manual record-keeping.

- Due to the limited time and hardware constraints of the hackathon, I emulated the functionality of Passive UWB tags using GPS. Instead of low-level C programming and specialized UWB hardware, I used GPS coordinates to simulate inventory tracking and location updates. This approach allowed me to demonstrate the core concept—real-time asset tracking—while showcasing the system's potential without the need for dedicated UWB scanners and tags.

## Setup & Installation
Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```sh
git clone https://github.com/kushagra0304/Warehouse-Inventory-Positioning-System
cd Warehouse-Inventory-Positioning-System
```

### 2. Install Dependencies
Using npm:
```sh
npm run install (I made this script)
```

### 3. Start Backend and Frontend
```sh
npm run frontend
```
```sh
npm run backend
```

## Usage Instructions

### Components Overview

This project consists of multiple components that need to be running simultaneously. Below are the key components and their usage:

### 1. Tags
- You can use any number of tags with the current prototype.
- To generate a tag, open the following URL on any device:
- http://<YOUR_INTERNAL_IP>:5173/tag, Replace `<YOUR_INTERNAL_IP>` with the internal IP of the device hosting the Vite server.
- When this URL is accessed, a tag with a unique UID is generated.
- Each tag sends a signal or GPS coordinates every 5 seconds.

### 2. Scanner
- The scanner is responsible for detecting tags in the environment.
- To start scanning, click the **Start Scan** button.
- When scanning starts, it maps the current GPS coordinates as the bottom-left corner of a **100x100 m area**.
- All detected tags are marked on an **Admin Dashboard** relative to this coordinate.
- **Only one scanner can be active at a time.**
- The scanner scans the environment every **3000 seconds**.
- To access the scanner, open:
http://<YOUR_INTERNAL_IP>:5173/scanner

### 3. Admin Dashboard
- The Admin Dashboard displays a map with all detected tags.
- To view the dashboard, open:
http://<YOUR_INTERNAL_IP>:5173/admin

### Notes:
- Replace `<YOUR_INTERNAL_IP>` with the actual internal IP of the device running the Vite server (e.g., `192.168.31.101`).
- The internal IP will vary depending on your network setup.

## Demo Video Link 