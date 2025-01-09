
# AuctionSite

AuctionSite is a web application designed to facilitate online auctions, allowing users to list items for auction and place bids in real-time.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Accessing the Application](#accessing-the-application)
- [Additional Notes](#additional-notes)

---

## Prerequisites

Ensure the following software is installed on your system:

- **Python 3.13.0**: [Download Python](https://www.python.org/downloads/)
- **Node.js**: [Download Node.js](https://nodejs.org/)

---

## Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone [https://github.com/christancone/AuctionSite.git](https://github.com/christancone/AuctionSite.git)
   cd AuctionSite/backend/AuctionAppBackend
   ```

2. **Create and Activate a Virtual Environment:**

   ```bash
   python -m venv myenv
   ```
   ```bash
   # On Windows
   myenv\Scripts\activate
   ```
   ```bash
   # On Unix or macOS
   source myenv/bin/activate
   ```

4. **Install Backend Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Apply Migrations:**

   ```bash
   python manage.py migrate
   ```

6. **Create a Superuser:**

   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to set a username, email, and password.

7. **Run the Backend Server:**

   ```bash
   python manage.py runserver
   ```
   The backend server will be accessible at: `http://127.0.0.1:8000/`

---

## Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ../../frontend/AuctionApp
   ```

2. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Frontend Development Server:**

   ```bash
   npm start
   ```
   The frontend application will be accessible at: `http://localhost:3000/`

---

## Accessing the Application

- **Frontend:** `http://localhost:3000/`
- **Backend API:** `http://127.0.0.1:8000/`
- **Django Admin Interface:** `http://127.0.0.1:8000/admin/`

Use the superuser credentials you created to log in to the admin interface.

---

## Additional Notes

- Make sure to run the backend and frontend servers simultaneously.
- If you encounter any issues with dependencies, try updating pip or npm:

   ```bash
   pip install --upgrade pip
   npm install -g npm
   ```

- Refer to the `settings.py` file in the backend for environment-specific configurations.
- Contributions and pull requests are welcome!

