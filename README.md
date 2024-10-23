# Udemy Clone

## Overview

This project is a Udemy clone built with Vue 3, implementing core functionalities of the original Udemy platform while also introducing additional features. It provides a seamless experience for both students and administrators, including course purchases, article publishing, and more.

## Features

- **User Authentication**: Two-factor authentication for enhanced security.
- **Student Dashboard**: Students can log in to browse and purchase courses.
- **Admin Dashboard**: Admins can approve student purchases and publish articles.
- **Dynamic Pages**: Each course and article has its own dynamic page for better user engagement.
- **Article Comments**: Users can comment on articles to foster discussion.
- **Shopping Cart**: A dedicated cart page for managing course purchases.
- **Rich Text Editor**: Integrated Quill editor for article creation and editing.

## Installed Packages

The project uses the following packages:

```bash
@babel/core@7.25.7
@babel/eslint-parser@7.25.7
@fortawesome/fontawesome-free@6.6.0
@vue/cli-plugin-babel@5.0.8
@vue/cli-plugin-eslint@5.0.8
@vue/cli-plugin-router@5.0.8
@vue/cli-plugin-vuex@5.0.8
@vue/cli-service@5.0.8
@vueup/vue-quill@1.2.0
assert@2.1.0
axios@1.7.7
bootstrap-icons@1.11.3
bootstrap-vue-3@0.5.1
bootstrap-vue@2.23.1
bootstrap@5.3.3
buffer@6.0.3
core-js@3.38.1
crypto-browserify@3.12.0
eslint-plugin-vue@8.7.1
eslint@7.32.0
icons@1.0.0
katex@0.16.11
os-browserify@0.3.0
otplib@12.0.1
path-browserify@1.0.1
process@0.11.10
qrcode@1.5.4
quill@2.0.2
speakeasy@2.0.0
stream-browserify@3.0.0
url@0.11.4
util@0.12.5
vm-browserify@1.1.2
vue-axios@3.5.2
vue-router@4.4.5
vue@3.5.11
vuex@4.1.0
```

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd udemy-clone
   ```

2. **Install dependencies**:

   Ensure you have Node.js installed. You can check your version by running:

   ```bash
   node -v
   ```

   Then install the required packages:

   ```bash
   npm install
   ```

3. **Run the development server**:

   After the installation is complete, start the development server:

   ```bash
   npm run serve
   ```

   This command will launch the application, and you can access it in your browser at `http://localhost:8080` (or another port if specified).

4. **Build for production**:

   If you want to build the project for production, run:

   ```bash
   npm run build
   ```

   This will create a `dist` directory with the production build of your application.

## Environment Variables

To manage environment variables, create a `.env` file in the root of the project and include any necessary configurations, such as API keys or server URLs.

Example `.env` file:

```plaintext
VUE_APP_API_URL=http://localhost:8000/api
```

## Contribution Guidelines

1. **Fork the repository**: Create your own copy of the repository.
2. **Create a feature branch**: Use a descriptive name for your branch (e.g., `feature/user-auth`).
3. **Commit your changes**: Make sure to include clear commit messages.
4. **Push to your branch**: Push your changes to your forked repository.
5. **Create a pull request**: Submit a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgments

- Inspired by the Udemy platform.
- Built using Vue.js, Bootstrap, and various open-source libraries.
