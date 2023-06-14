<!-- @format -->

# [TaskEase Master](https://taskease Mastermaster.web.app/) - Task Management Application

## Description

TaskEase Master is a web-based task management application designed to help individuals and teams organize and track their tasks efficiently. It provides a user-friendly interface and seamless integration with Firebase services such as Authentication, Cloud Storage, and Hosting.

## Live Demo:

[TaskEase Master](https://taskease Mastermaster.web.app/)

## Features

-   **User Authentication**: TaskEase Master leverages Firebase Authentication to allow users to sign up, log in, and securely access their tasks.
-   **Task Creation**: Users can create tasks, assign due dates, set priorities, and categorize them into different lists or projects.
-   **Task Tracking**: TaskEase Master provides a clear overview of tasks with features like status updates, progress tracking, and sorting options.
-   **Collaboration**: Users can invite and collaborate with team members by assigning tasks, sharing comments, and monitoring progress.
-   **Notifications**: TaskEase Master sends notifications to users for approaching due dates, task assignments, and important updates.
-   **Cloud Storage**: Users can attach files and documents to their tasks using Firebase Cloud Storage, ensuring easy access and seamless sharing.
-   **Responsive Design**: The application is designed to be responsive and adaptable to different screen sizes, providing a consistent experience across devices.

## Technologies Used

TaskEase Master is built using the following technologies:

-   **Frontend**: HTML, CSS, JavaScript
-   **Backend**: Firebase Authentication, Firebase Cloud Storage, Firebase Hosting

## Installation

To run TaskEase Master locally, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/UBakaliya/taskease Master-v1.git
    ```

2. Navigate to the project directory:

    ```
    cd taskease Master-v1
    ```

3. Open the `index.html` file in your preferred web browser.

4. Customize the Firebase configuration:

    - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com).
    - Enable Authentication, Cloud Storage, and Hosting services for your project.
    - Obtain your Firebase configuration details (API key, project ID, etc.).
    - Replace the placeholder values in the `firebaseConfig` object within the `app.js` file with your Firebase configuration.

5. Start using TaskEase Master to manage your tasks efficiently!

## Deployment

To deploy TaskEase Master using Firebase Hosting, follow these steps:

1. Install the Firebase CLI globally (if not already installed):

    ```
    npm install -g firebase-tools
    ```

2. Navigate to the project directory:

    ```
    cd taskease Master
    ```

3. Login to Firebase using the CLI:

    ```
    firebase login
    ```

4. Initialize Firebase within the project:

    ```
    firebase init
    ```

    - Select the Firebase features you want to set up (Authentication, Cloud Storage, and Hosting).
    - Choose your Firebase project from the list.
    - Set the public directory to `public`.
    - Configure as a single-page application (SPA) by rewriting URLs to `index.html`.

5. Build the project:

    ```
    firebase build
    ```

6. Deploy the project to Firebase Hosting:

    ```
    firebase deploy
    ```

7. Your TaskEase Master application is now deployed and accessible at the provided Firebase Hosting URL.

## Contributions

Contributions to TaskEase Master are welcome! If you find any bugs or have suggestions for new features, please create an issue in the repository or submit a pull request.

## License

TaskEase Master is open source software licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute the application as per the terms of the license.

## Contact

For any further questions or inquiries, please contact the TaskEase Master development team through the application.
