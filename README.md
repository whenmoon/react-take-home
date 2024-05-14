# react-take-home

## Installation Instructions
To run client and server locally follows these step to get it up and running:
- In the terminal, clone the repository using the command `git clone https://github.com/whenmoon/react-take-home.git`
- Change directory to the cloned repository using by running `cd react-take-home`
- Install the server and client dependencies: `npm i && cd client && npm i`
- While in the client directory, you can run the tests with the command  `npm run test`
- To start the application, `cd` back to the root of the repository and run `npm run dev`. The client and server should start to run and you can interact with the frontend in the browser by navigating to http://localhost:3000/ 

## Responsive Design
The app is suited to all screen sizes and devices. Tailwind utility classes are used to maintain responsiveness, affecting typography and layout.

## Libraries
- Data fetching and server state syncronisation - [React Query](https://tanstack.com/query/v3)
- Styling - [Tailwind](https://tailwindcss.com/)
- Form and form validation - [React Hook Form](https://react-hook-form.com/)
- Component libraries - [Daisy UI](https://daisyui.com/), [React Select](https://react-select.com/) and [React Modal](https://reactcommunity.org/react-modal/)

## Notes On Technical Approach
- There is basic unit test coverage of the "util" functions in the client application. I would like to increase the coverage to components, hooks and other business logic.
- The API is abstracted to a client implementation to allow for reusable and extendable fetch methods. These have been easily integrated with a caching and synchronization layer.
- Reusable UI components have been built are far as possible within the time constraints
- Client-side form validation is implemented to match product updates with data schemas and preserve unnecessary network requests
- The app uses `ModalContext` to avoid re-rendering the product list when the modal is opened and closed. The Product list is then programmatically re-fetched when necessary 
- Ideally there would be less data parsing to populated the Select component options but I think achieving both this and persisting server-side data are a matter for the API.

## Screen Recordings:
### Responsive Product List:
https://github.com/whenmoon/react-take-home/assets/33122888/3453a4d1-0c18-4081-a3c1-4f6470107a80

### Responsive Form:
https://github.com/whenmoon/react-take-home/assets/33122888/d882b72a-560c-4821-bb22-d9e6824336ca

### Add Product And Client-side Form Validation:
https://github.com/whenmoon/react-take-home/assets/33122888/fc2b9481-4386-46d7-82a4-b27087f439eb
