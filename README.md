# Profile Finder

An intuitive web application built with **React**, **Vite**, **Tailwind CSS**, **React Router**, and **Leaflet** that allows users to explore profiles and view their geographic locations on an interactive map. This app provides a smooth, user-friendly experience to navigate through profiles and visualize their locations with a click of a button.

## Features

- **Profile Display**: Browse a collection of profiles with essential details like name, photograph, and a brief description.
- **Interactive Map**: View the geographic locations of profiles on an interactive map powered by **Leaflet**. Markers pinpoint the addresses of each profile.
- **Summary Button**: Each profile has a "Summary" button that displays the profile's address on the map with a marker when clicked.
- **Admin Panel**: Admins can **add**, **edit**, or **delete** profiles through an easy-to-use dashboard.
- **Search & Filter**: Users can filter profiles by name, location, or other attributes.
- **Responsive Design**: Mobile-friendly and responsive layout using **Tailwind CSS**.
- **Profile Details**: View more detailed information about a profile in a separate detailed view.
- **Error Handling & Validation**: Robust error handling for invalid addresses or failed map requests.
- **Loading Indicators**: Progress bars and indicators while the app is fetching data or rendering maps.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast development build tool for modern web apps.
- **Tailwind CSS**: A utility-first CSS framework for fast UI development.
- **React Router**: A library for navigating between different views or pages in a React application.
- **Leaflet**: A leading JavaScript library for mobile-friendly interactive maps.


## Installation

To get started, clone this repository and install the necessary dependencies:
first install nodemon gloabally
```
npm install -g nodemon
```
then
```
git clone https://github.com/TejasKarambe/ProfileFinder.git
cd ProfileFinder
```
## for backend:-
```
cd backed
npm install
npm start
```
This will start the development server at `http://localhost:5000`.


## for frontend
```
cd frontend
npm install
npm run dev
```
This will start the development server at `http://localhost:5171`.

## Usage

1. Visit the homepage to browse through the list of profiles.
2. Click the "Summary" button next to any profile to view its location on the map.
3. Use the admin panel to manage profiles (add/edit/delete).
4. Search and filter profiles using the search bar.
5. Enjoy a responsive, user-friendly experience on desktop or mobile devices.

## Contributing

If you’d like to contribute, please fork the repository and submit a pull request. We welcome any feedback, improvements, or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Leaflet**: For providing the powerful mapping library.
- **Tailwind CSS**: For simplifying the UI design with utility-first classes.
- **React Router**: For enabling seamless navigation within the app.

---

Feel free to explore, contribute, and use this app to enhance your own projects!
