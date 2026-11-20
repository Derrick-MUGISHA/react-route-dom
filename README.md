# MyStore — React e-commerce learning project

A responsive storefront built with React, Vite, React Router, and Tailwind CSS. This project teaches dynamic routes, protected routes, shared state, custom hooks, effects, and React rendering through a working shopping flow.

**This is a complete frontend demo, not a live commerce service.** Sign-in accepts sample details, checkout does not charge money, and orders are saved only in this browser. Client-side route guards demonstrate navigation behavior; they do not secure data.


## Start here: a simple learning order

Read one feature at a time. You do not need to understand checkout before learning a product route.

1. **Display data:** Open `src/data/products.js`, then `src/components/Product.jsx`. See how one object becomes a card through props.
2. **Read one item:** Open `src/App2.jsx`, then `src/pages/ProductPage.jsx`. Follow a URL parameter into a product lookup.
3. **Update the cart:** Open `src/store/shop.js`, then `src/store/ShopProvider.jsx` and `src/store/ShopContext.js`. Follow a button click into shared state.
4. **Protect a page:** Open `src/components/ProtectedRoute.jsx`, then `src/pages/LoginPage.jsx`. Try visiting checkout while signed out.
5. **Create an order:** Open `src/pages/CheckoutPage.jsx`, then `src/pages/OrdersPage.jsx`. See where form data goes.
6. **Understand React:** Read the rendering and custom-hook sections below. Compare the explanation with `useAutoSlide` and `useShop`.

The app uses React hooks, React Router, plain functions, and browser storage. There is no added state-management library, backend framework, payment SDK, or custom form framework. A page has its own file so you can open exactly the feature you are studying.

## Run the app

Use a Node.js version supported by the installed Vite release (Node 22.12+ is a suitable baseline) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

```bash
npm run build          # Build the production files in dist/
npm run preview        # Serve the production build locally
node --test tests/shop.test.js  # Check cart, lookups, totals, and orders
npm run lint           # Lint the whole project, including older lesson examples
```

The original `src/App.jsx` contains earlier effect exercises, including deliberately broken examples. It is not the storefront entry point and may produce lint warnings/errors. Check the storefront independently with:

```bash
npx eslint src/App2.jsx src/main.jsx src/components src/pages src/store src/hook tests
```

## What you can do

- Browse products, search by name or description, filter by category, and sort by price.
- Read one product using its ID or its readable slug.
- Add products to your bag, change quantities, and remove items.
- Keep the cart, demo profile, and demo orders across page refreshes.
- Sign in with a sample name and email, then return to the protected page you requested.
- Complete a demo checkout and review order history for the current demo email.
- Use the navigation on mobile and desktop, with keyboard focus and a skip-to-content link.

Prices are in USD. Delivery is $10 below $200 and free at $200 or above. Empty carts have no delivery fee. No taxes are calculated. Stock limits are per cart; this demo does not track shared inventory or decrement warehouse stock after orders.

## Project map: what each part does

| File or folder | Responsibility |
| --- | --- |
| `index.html` | HTML document, title, description, root element, and module entry. |
| `src/main.jsx` | Mounts React with `createRoot`; provides `BrowserRouter` and development `StrictMode`. |
| `src/App2.jsx` | Active app: provides shared shop state and declares the route tree. |
| `src/components/Layout.jsx` | Shared navigation, main outlet, storage warning, footer, and skip link. |
| `src/components/Nav.jsx` | Router links, bag count, sign-in/out controls, and local mobile-menu state. |
| `src/components/Hero.jsx` | Home slideshow, slide controls, and a link to the featured product. |
| `src/components/Product.jsx` | Product card, add-to-bag interaction, and reusable product grid. |
| `src/components/About.jsx` | Home-page introduction, receiving its content through props. |
| `src/components/Footer.jsx` | Shared brand, navigation links, and placeholder contact details. |
| `src/components/ProtectedRoute.jsx` | Allows a nested route or redirects to demo sign-in. |
| `src/pages/HomePage.jsx` | Composes hero, store benefits, products, and introduction. |
| `src/pages/CatalogPage.jsx` | Product search, category filtering, and price sorting. |
| `src/pages/ProductPage.jsx` | One product found by ID or slug. |
| `src/pages/CartPage.jsx` | Cart rows, quantity changes, and removal. |
| `src/pages/LoginPage.jsx` | Sample profile form and return-to-page navigation. |
| `src/pages/CheckoutPage.jsx` | Delivery form and demo order submission. |
| `src/pages/OrdersPage.jsx` | Current demo email's saved orders and confirmation. |
| `src/components/EmptyState.jsx` | Shared message and browse link for empty or missing content. |
| `src/components/OrderSummary.jsx` | Shared subtotal, delivery, and total display. |
| `src/pages/AboutPage.jsx` | Store/project introduction. |
| `src/pages/ContatcPage.jsx` | Demo contact and shopping information; filename retains the original spelling. |
| `src/pages/NotFound.jsx` | Fallback for an unknown URL. |
| `src/data/products.js` | Product catalog: stable ID, unique slug, name, price, image, category, and stock. |
| `src/data/hero.js`, `site.js`, `navigation.js` | Editable slideshow content, brand text, and menu destinations. |
| `src/store/shop.js` | Pure reducer, product lookups, cart normalization, currency formatting, and totals. |
| `src/store/ShopContext.js` | Context definition and `useShop` custom hook. |
| `src/store/ShopProvider.jsx` | Owns shared state, initializes it from storage, and persists changes. |
| `src/hook/useAutoSlide.js` | Reusable slideshow timer with cleanup. |
| `src/index.css` | Tailwind import, store styles, responsive layouts, and focus behavior. |
| `src/App.jsx` | Earlier standalone lessons; not mounted by the storefront. |
| `tests/shop.test.js` | Tests business rules without rendering React. |

## Change-by-change walkthrough

This section explains the code added or changed to turn the original landing page into the shopping demo. The earlier file map tells you **where**; this walkthrough explains **what changed and why**. Later sections explain routing, rendering, and hooks in more depth.

### 1. Entry point and route tree

- **`index.html`:** Replaced the template title and added a description. These describe the store in the browser tab and HTML metadata; they do not manage React state.
- **`src/main.jsx`:** Kept `BrowserRouter` around the app and removed a stray comma from the rendered children. `BrowserRouter` makes router components and hooks work. `StrictMode` keeps the development checks enabled.
- **`src/App2.jsx`:** Added one `ShopProvider` around the routes, one shared `Layout` route, public shop routes, and a group of protected routes. The provider stays mounted while pages change, so the cart survives navigation. The wildcard route catches unknown URLs.

`src/App.jsx` remains the older exercise file. It is not imported by the storefront. `App2.jsx` is the active route tree; keeping this name avoids confusing it with the existing exercises.

### 2. Product data and product cards

- **`src/data/products.js`:** Added `slug`, `category`, and `stock` to each existing product. The slug identifies a readable URL, category supports filtering, and stock limits quantities. The existing IDs, descriptions, images, and prices remain the catalog data.
- **`src/components/Product.jsx`:** Product images and names now link to the detail route. `handleAddToCart` dispatches the product ID to shared state and sets local `added` feedback. `cartItem`, `quantityInCart`, and `stockLimitReached` make the stock check readable. The button disables at the stock limit. `ProductList` still maps the catalog into cards using stable product IDs as keys.
- **`src/pages/ProductPage.jsx`:** Reads `id` and `slug` with `useParams`. The `lookup` prop chooses which helper finds the product. An early return handles a missing product. The remaining JSX displays the product, stock, price, add button, and both route forms.

A card receives data through props, for example `<Product {...product} />`. This spread passes fields such as `name` and `price` as separate props. `useShop()` provides shared behavior; the parent no longer passes a counter-only cart callback down to each card.

### 3. Shared shop functions and reducer

**`src/store/shop.js`** keeps shopping rules outside JSX so they can be read and tested separately:

| Function or value | What the added code does | Small example |
| --- | --- | --- |
| `initialState` | Starts with an empty cart, no user, and no orders. | `{ cart: [], user: null, orders: [] }` |
| `money(amount)` | Formats a number for display without changing the stored number. | `money(80)` displays `$80.00`. |
| `findById(id)` | Finds one matching catalog ID, accounting for string URL values. | `findById('1')` finds the watch. |
| `findBySlug(slug)` | Finds one exact slug. | `findBySlug('smart-watch')` finds the same watch. |
| `cartDetails(cart)` | Loops over saved IDs, finds each product, and adds a valid whole-number quantity. Unknown IDs are skipped. | `{ id: 1, quantity: 2 }` becomes the watch's fields plus `quantity: 2`. |
| `totals(items)` | Adds each `price × quantity`, calculates delivery, and returns all three amounts. | One $80 item gives `{ subtotal: 80, shipping: 10, total: 90 }`. |
| `shopReducer(state, action)` | Chooses an update using `action.type` and returns the next state. | `{ type: 'add', id: 1 }` adds a watch. |

Inside the reducer, `add` uses an explicit `if/else`: update the existing row with `map`, or append a new row with spread. `quantity` removes a row with `filter` when quantity is zero/invalid, otherwise it updates the matching row with `map`. `login` and `logout` replace the user field. `order` builds one saved order and returns a state with an empty bag and the new order first. Unknown actions return the original state.

`cartDetails` rounds a saved fractional quantity down, then clamps it between one and stock. The normal quantity selector already sends whole numbers. This extra step handles values read from storage.

### 4. Provider, persistence, and custom access hook

- **`src/store/ShopProvider.jsx`:** Owns the reducer state. `readState()` parses browser storage inside `try/catch`; `validCart`, `cart`, `orders`, and `user` name each restoration step. `useReducer(shopReducer, undefined, readState)` uses that function to initialize the provider. The `undefined` is the unused initial argument passed to the initializer; `readState` reads storage instead.
- The provider's **effect** saves committed state with `JSON.stringify`. `[state]` makes it run when state changes. Storage failures set a warning instead of stopping the app. The single ESLint exception permits this error-reporting state update from the external storage synchronization; ordinary totals and filtering are calculated during render.
- The provider calculates **`items` and `cartCount`** from current state. They are not stored as separate state that could get out of sync. Its `value` object exposes those values and `dispatch` to children.
- **`src/store/ShopContext.js`:** Defines the context and `useShop()`. The hook reads the nearest provider and throws a clear error if it is missing. It does not create a new cart for each caller.

Example cart data is `[ { id: 1, quantity: 2 } ]`. Full product details stay in the catalog. Saved orders include full item details to preserve the order's original price and name.

### 5. Navigation and shared layout

- **`src/components/Layout.jsx`:** Moved navigation and footer into one parent layout. It reads the shared cart count, displays storage warnings, and renders the active child with `<Outlet />`. The skip link targets `main` for keyboard navigation.
- **`src/components/Nav.jsx`:** Replaced page anchors with router links. `NavLink` identifies the current page. The bag count now comes from actual item quantities. `isOpen` controls the mobile menu; `closeMenu` closes it after navigation. `handleLogout` clears the demo user and closes the menu.
- **`src/components/Footer.jsx`:** Changed internal menu anchors to `Link`, preserving client-side navigation.
- **`src/components/Hero.jsx`:** Changed “Shop the collection” to a catalog router link and “View product” to the featured product's slug route. Its existing slideshow still uses the custom hook.
- **`src/pages/HomePage.jsx`:** Removed the page-local counter and cart callback. The cards use the shared provider now. Removed the extra `Layout` wrapper because the route tree supplies it. Added a short delivery/demo information strip.

### 6. Catalog, cart, and shared display components

- **`src/pages/CatalogPage.jsx`:** Reads `q`, `category`, and `sort` from the query string. `updateFilter` copies the current search parameters before changing one value. Named `matchesCategory` and `matchesSearch` checks decide what to display. `filter` returns a new array, so sorting it leaves the original catalog unchanged. `Set` removes duplicate category names before rendering options. The empty-results button clears the query parameters.
- **`src/pages/CartPage.jsx`:** Reads resolved `items`, maps them into rows, and uses `changeQuantity` to dispatch quantity changes. The selector offers numbers from one to stock using `Array.from`. Remove dispatches quantity zero. The page returns a friendly empty state when no rows remain.
- **`src/components/OrderSummary.jsx`:** Extracted the subtotal/delivery/total layout so cart and checkout use the same calculation and display. It takes `items` as a prop and calls `totals(items)`.
- **`src/components/EmptyState.jsx`:** Extracted a small reusable message and browse link. `title` fills the heading and `children` fills the explanatory text. There is no state or effect here.

### 7. Sign-in, protection, checkout, and orders

- **`src/components/ProtectedRoute.jsx`:** Uses an explicit signed-in check. Return `<Outlet />` for a demo user; otherwise return `<Navigate />` with the requested path in location state.
- **`src/pages/LoginPage.jsx`:** `handleSubmit` prevents a full page reload, reads named form inputs with `FormData`, trims the name, lowercases the email, and dispatches `login`. On its next render the user exists, so the page redirects. An explicit destination check only permits returning to checkout or orders.
- **`src/pages/CheckoutPage.jsx`:** Reads current items and user, handles an empty bag, and collects a sample delivery address. `handleSubmit` creates the order ID and timestamp in the event handler, dispatches the order, and navigates to `/orders`. Local `submitting` state disables the button while leaving the page. No payment request is made.
- **`src/pages/OrdersPage.jsx`:** Filters saved orders by the current demo email, renders item snapshots, and displays a confirmation when navigation state contains an order ID. An empty list shows a browse message. This display filter does not prove ownership or secure the stored records.

Form inputs use `name` so `FormData` can read them. `required`, `type="email"`, `maxLength`, and the non-whitespace `pattern` let the browser catch basic mistakes. Catalog search is a **controlled input** (`value` plus `onChange`); delivery fields are **uncontrolled inputs** read at submission. `defaultValue` only supplies an uncontrolled field's starting value.

### 8. Information pages, styles, and hook comments

- **`src/pages/AboutPage.jsx`:** Replaced the placeholder heading with store/project information and a browse link. Removed its duplicate `Layout` wrapper.
- **`src/pages/ContatcPage.jsx`:** Replaced the placeholder with demo shopping/contact information. Removed its duplicate layout. It does not submit messages, and the placeholder email is explained.
- **`src/pages/NotFound.jsx`:** Keeps the unknown-page fallback and uses a router link to return to products. It is displayed inside the shared layout.
- **`src/index.css`:** Added styles for navigation, product grids, details, filters, forms, cart rows, summaries, order cards, empty states, and the skip link. Rules at 900px and 680px adapt grids and navigation for smaller screens. These are visual rules; they do not protect routes or update data. Tailwind's existing import and classes remain in use.
- **`src/hook/useAutoSlide.js`:** Preserved the timer behavior and added comments explaining state, the early exit, functional updates, modulo wrapping, dependencies, cleanup, and the returned pair. The custom-hook section below explains each part.

### 9. Tests, dependencies, and the simpler file structure

- **`tests/shop.test.js`:** Uses Node's built-in test runner and assertions. It checks both lookups, unknown products, immutable cart updates, stock limits, quantity removal, restored quantities, delivery thresholds, and the user/cart requirements for orders. It needs no added test library and does not test browser layout.
- **`README.md`:** Replaced the starter README with setup steps, this change guide, routes, shopping rules, rendering concepts, custom hooks, and manual checks.
- **`package.json` and `package-lock.json`:** These already had local dependency changes when the storefront work began. They were preserved. This implementation and readability refactor added no dependencies or scripts; do not assume every Git diff in those files came from this work.
- **Removed `src/pages/ShopPages.jsx`:** This was the first implementation's combined page file. Its six pages now each have their own file; the two shared display components live in `components`. `App2.jsx` imports the individual pages directly. The routes and shopping flow remain the same.

The readability refactor uses ordinary `if` statements, named event handlers, loops, `map`, and `filter`. It adds no framework layer or generic abstraction. Comments explain the important decisions beside the code; this README provides the longer explanation.

## Small practice tasks

Try these in order, one change at a time:

1. Change one product description in `products.js`. Open its card and detail page: both read the same catalog object.
2. Open `/products/id/1`, then `/products/smart-watch`. Explain which parameter and lookup function each route uses.
3. Add the $80 headphones twice. Subtotal should be $160, delivery $10, total $170. Add once more: subtotal is $240 and delivery becomes free.
4. Sign out and open `/checkout`. Follow the redirect in `ProtectedRoute`, sign in with sample details, and find the return destination in `LoginPage`.
5. Change the hero's hook delay from `5000` to `2000`. Find the effect dependency that causes the timer to be replaced.
6. In a product click handler, identify the shared cart update and local feedback update. Explain which state each changes.

## Routes

| URL | Page | Access |
| --- | --- | --- |
| `/` | Home | Public |
| `/products` | Catalog | Public |
| `/products/id/1` | One product by ID | Public |
| `/products/smart-watch` | The same product by slug | Public |
| `/cart` | Bag | Public |
| `/login` | Demo sign-in | Public |
| `/checkout` | Delivery form and demo order | Demo sign-in required |
| `/orders` | Current demo email's order history | Demo sign-in required |
| `/about`, `/contact` | Information pages | Public |
| Any unmatched URL | Page not found | Public |

`Layout` is a parent route. Its `<Outlet />` is where the matched child page renders. The layout stays in place while the outlet changes. `Link` and `NavLink` navigate through React Router without loading a new HTML document; `NavLink` also provides an active state.

### Read one item by ID

In `App2.jsx`:

```jsx
<Route path="products/id/:id" element={<ProductPage lookup="id" />} />
```

`:id` is a dynamic path segment. Visiting `/products/id/1` gives `useParams()` the value `{ id: '1' }`. URL parameters are strings, even when the stored ID is a number.

```jsx
const { id } = useParams();
const product = findById(id);
```

`findById` compares string representations so `'1'` matches the numeric ID `1`. It returns the object or `undefined`. The page renders a product-not-found state when no product matches.

### Read one item by slug

```jsx
<Route path="products/:slug" element={<ProductPage lookup="slug" />} />
```

Visiting `/products/smart-watch` gives `{ slug: 'smart-watch' }`.

```jsx
const { slug } = useParams();
const product = findBySlug(slug);
```

A slug is a readable URL identifier. This catalog explicitly stores slugs so renaming a product does not automatically break its URL. Keep IDs and slugs unique. `products/id/:id` uses an extra segment to distinguish an ID lookup from a slug lookup; there is no guessing whether a numeric slug is an ID.

Both routes render the same `ProductPage`, with `lookup` deciding which search to run. Cards use slug links, and the detail page includes both URL forms for learning.

### Search parameters are different from route parameters

For `/products?q=watch&category=Wearables&sort=price-low`, `useSearchParams()` reads the query string. The catalog derives its displayed list from those values. Updating the URL with `setParams` makes search/filter choices bookmarkable and triggers a render with the new results. Filtering and sorting are derived calculations, so they do not need an effect or a second copy of products in state.

## How route protection works

`ProtectedRoute.jsx` reads the current demo user and requested URL:

```jsx
const { user } = useShop();
const location = useLocation();
if (user) return <Outlet />;
return (
  <Navigate
    to="/login"
    replace
    state={{ from: location.pathname + location.search }}
  />
);
```

1. A visitor requests `/checkout` or `/orders`.
2. If there is a user, the guard renders its outlet, allowing the child page to render.
3. Otherwise, `Navigate` redirects to `/login`. `replace` replaces the protected history entry. Router location state remembers the destination.
4. Submitting the demo sign-in form dispatches `login`.
5. Context updates, the login page renders again, and it redirects to the remembered internal destination. The login page only accepts the known protected destinations.
6. Signing out dispatches `logout`. If a protected page is open, its guard renders again and redirects to sign-in.

The protected pages are grouped under one guard in `App2.jsx`:

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="checkout" element={<CheckoutPage />} />
  <Route path="orders" element={<OrdersPage />} />
</Route>
```

**This guard is for the demo UI only.** A user can edit localStorage or inspect bundled data. Filtering orders by email is a demo convenience, not authorization. A real server must authenticate the session and authorize each request before returning protected data or accepting an order. Do not store real credentials or sensitive customer data in this demo.

## Shared state, cart, and checkout

`ShopProvider` sits above the routes, so changing pages does not reset the bag. Its `useReducer` stores `{ cart, user, orders }`. Components call `dispatch` with actions; `shopReducer` computes the next state without mutating the previous one.

| Action | Result |
| --- | --- |
| `add` | Adds a known product or increases its quantity up to stock. |
| `quantity` | Updates quantity up to stock; zero removes the item. |
| `login` | Stores a sample name/email as the demo profile. |
| `logout` | Clears the profile while preserving the browser's cart and orders. |
| `order` | Requires a profile and nonempty bag, snapshots items and totals, then clears the bag. |

The cart stores IDs and quantities. `cartDetails` joins those entries to the catalog for display, ignores unknown IDs, and bounds quantities. `totals` calculates subtotal, delivery, and final total in one place, so the bag, checkout, and saved order agree.

Checkout uses browser form validation for required delivery fields. Its submit handler creates an order ID and timestamp, dispatches one `order` action, then navigates to order history. Saving the order and clearing the cart in the same reducer action keeps them together. Stored order items are snapshots, so later catalog price changes do not rewrite old totals.

The storage initializer runs when the provider mounts. It attempts to read `mystore-demo-v1`, checks the expected top-level shape, and falls back to an empty store if reading or parsing fails. An effect writes state changes back to localStorage; if saving fails, shopping continues in memory and a warning appears. This is basic demo recovery, not a schema/security boundary. State is not synchronized live between multiple tabs or devices. To reset the demo, remove `mystore-demo-v1` from browser storage and refresh.

## Virtual DOM, rendering, and re-rendering

The **real DOM** is the browser's tree of elements, such as buttons, images, and text nodes. React elements created by JSX describe what the UI should look like. People often call this in-memory description the **virtual DOM**. React's internal reconciliation structures track the rendered component tree; the virtual DOM is not a second visible webpage.

A UI update has these stages:

1. **Trigger:** Initial mounting, a state/reducer update, a parent render, or a context value change schedules work.
2. **Render:** React calls components to calculate their next JSX. Rendering should be pure: read props/state and return a description, without writing storage or starting timers.
3. **Reconcile:** React compares the next tree with the previous one, considering element types, positions, and keys.
4. **Commit:** React applies the needed DOM changes. A component render does not imply that its entire DOM subtree is replaced.
5. **Effects:** After a commit, React runs effects whose dependencies require them. `useEffect` generally allows the browser to paint first; exact timing can vary for interaction-driven updates.

### Example: clicking Add to bag

```text
Click handler
  → dispatch({ type: 'add', id: 1 })
  → reducer returns new state
  → ShopProvider renders with a new context value
  → context consumers render using the updated cart
  → React commits changed text/attributes/rows
  → persistence effect writes the new state to localStorage
```

The navigation count changes. The cart may show an extra row or updated quantity. React can reuse an unchanged image element even if its component rendered again. **Rendering calculates UI; committing changes the DOM.**

### What causes a re-render here?

- `setIsOpen` renders `Nav` with the expanded/collapsed mobile menu.
- `setAdded` renders a product card/detail with its confirmation message.
- A reducer action renders the provider and updates components reading its context.
- A timer's `setIndex` renders the hero with the next active slide.
- Router navigation changes the matched page or route/query parameters.
- A parent rendering can render its children, even if their visible output stays the same.

A regular local variable does not persist between renders or schedule updates. Changing a ref does not schedule a render either. State setters schedule a future render; the current event handler still sees the state snapshot from the render that created it. For updates based on previous state, use a functional update such as `setIndex(previous => previous + 1)`.

### Why immutable updates and keys matter

The reducer returns new objects and arrays with spread, `map`, and `filter`. Mutating an existing state object can leave React with the same identity and cause missed updates or confusing behavior. If an update resolves to the same state value, React can skip work.

Lists use stable keys such as `key={product.id}`. Keys help React match siblings when items are inserted, removed, or reordered. Array indexes are a poor choice when the list can change order. Matching component type, key, and tree position lets React preserve component state; replacing them can reset it.

The storefront has no manually added `React.memo`, `useMemo`, or `useCallback`. The existing Vite configuration enables React Compiler, which may apply automatic optimizations. Its context value is a new object when the provider renders, so consumers can render even when the particular field they use did not change. That is acceptable for this small catalog; automatic optimizations may skip some work when safe. Splitting contexts or memoizing expensive work can help larger apps after measuring; neither is needed to make the current app correct.

### StrictMode and effects

`main.jsx` enables `StrictMode`. In development React may call render logic and reducer/initializer functions more than once to find impurities. It also performs an extra effect setup/cleanup cycle. Production does not include these development checks. Seeing an extra development render is not the same as a duplicate purchase. Order creation stays in a submit handler and the reducer stays pure; it is not performed in a mount effect.

## Custom hooks: each role explained

A custom hook is a function beginning with `use` that calls React hooks to package reusable behavior. Call hooks at the top level of a component or another hook, before conditional returns. React associates hook state with call order. Do not call hooks in loops, conditions, or event handlers.

Custom hooks reuse **logic**. Separate calls normally have separate state. Shared state in this project comes from a shared context provider, not from the hook's name.

### `useAutoSlide(total, delay = 5000)`

Located at `src/hook/useAutoSlide.js`:

```jsx
export default function useAutoSlide(total, delay = 5000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(() => {
      setIndex(previous => (previous + 1) % total);
    }, delay);
    return () => clearInterval(interval);
  }, [total, delay]);
  return [index, setIndex];
}
```

| Part | Role |
| --- | --- |
| `total` | Number of slides; controls looping. The hero provides `images.length`. |
| `delay = 5000` | Default time between slides in milliseconds. |
| `useState(0)` | Remembers the current slide index across renders. The first slide is index zero. |
| `index` | Current render's selected slide. |
| `setIndex` | Schedules the next index and a render. Also returned for manual slide selection. |
| `useEffect` | Connects React to an external browser timer after commit. |
| `total <= 1` | Avoids creating a timer when sliding is unnecessary. |
| `setInterval` | Repeats the callback using the configured delay. |
| Functional update | Reads the latest queued index instead of a stale value captured by an old render. |
| `% total` | Wraps the last slide back to zero. |
| Cleanup function | Clears the old interval before a replacement effect and on unmount, preventing orphaned/duplicate timers. |
| `[total, delay]` | Restarts the timer when its configuration changes; ordinary index changes do not restart it. |
| `[index, setIndex]` return | Supplies the selected index and manual selection function to the calling component. |

`Hero` calls the hook once. Each timer tick changes `index`; React renders the hero and changes active slide classes. Clicking a slide button calls the same setter. This implementation assumes a fixed image list, as used here; a changing list would also need to keep the selected index in range. It does not fetch products or manage the cart.

### `useShop()`

Located at `src/store/ShopContext.js`:

```jsx
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}
```

- `ShopContext` defines the communication channel; its default is `null`.
- `ShopProvider` owns the actual reducer state and supplies the context value.
- `useContext(ShopContext)` reads the nearest provider and subscribes the component to its value changes.
- The guard catches a programming error if a consumer is mounted without the provider.
- The returned object exposes `cart`, `user`, `orders`, `dispatch`, resolved `items`, `cartCount`, and `storageError`.

`Nav`, product cards, cart, checkout, order history, and the route guard all read the same provider through this hook. The hook creates no separate cart and has no effect of its own.

### Other hooks used in the app

| Hook | Role in this project |
| --- | --- |
| `useState` | Local menu, feedback, slideshow index, and checkout submit status. |
| `useReducer` | Applies centralized state transitions for the shared shop. |
| `useEffect` | Starts/cleans up the slideshow timer and synchronizes shop state to storage. |
| `useContext` | Reads shared shop state through `useShop`. |
| `useParams` | Reads dynamic path segments for one product. |
| `useSearchParams` | Reads/writes catalog query parameters. |
| `useLocation` | Reads the requested protected URL or the order confirmation state. |
| `useNavigate` | Navigates to orders after successful demo checkout. |

`BrowserRouter` supplies the router context needed by its hooks. `ShopProvider` supplies the shop context needed by `useShop`. These contexts serve different purposes.

## `useEffect` and the earlier exercises

Effects synchronize a committed component with an external system. Rendering, filtering, computing totals, and responding to a purchase click do not inherently need effects.

- No dependency array: runs after every relevant commit.
- `[]`: setup on mount and cleanup on unmount, plus the extra development StrictMode cycle.
- `[value]`: runs on mount and again after commits where a dependency changes by `Object.is` comparison. Cleanup runs before the next setup and on unmount.
- Include reactive values used by an effect. Missing dependencies can leave it using old values, called a **stale closure**.

The unmounted lesson file `src/App.jsx` includes these examples:

| Example | What it demonstrates |
| --- | --- |
| `WelcomePage` | State-driven button with a mount logging effect. |
| `CounterTitle` | An empty dependency array logs the initial count only; use `[count]` to track changes. |
| `NameTitle` | Controlled input and an effect depending on `name`. It logs text; it does not actually set the browser title. |
| `Clock`, `SafeClock` | Intervals with cleanup; `SafeClock` uses a functional state update. |
| `WindowWidth` | Registers a named resize handler and removes that exact function during cleanup. |
| `Room` | Cleans up the previous room effect before setting up for the next `roomId`. |
| `BrokenClock` | Missing interval cleanup; deliberately unsafe and not mounted by the lesson app. |
| `MessageViewer`, `SendMessage` | Subscribe/unsubscribe to an event bus; send events from a click handler. |
| `UserName` | An ignore flag prevents an obsolete request result from setting state; it does not cancel the network request. |
| `UserDetails` | Loading/error/data states and `AbortController` cleanup for requests when `userId` changes. |
| `BrokenCounter` | Captures the initial `count`; repeatedly sets the same value rather than continuously incrementing. |
| `GoodCounter` | Uses `setCount(c => c + 1)` to calculate from current state. |
| Lesson `App` resize effect | Uses different anonymous functions for adding/removing the listener, so removal fails. Use one named handler as `WindowWidth` does. |

These exercises are retained as teaching material; the active store is `App2.jsx`.

## Verify the shopping flow

1. Visit `/products`, search for `watch`, clear the search, and try category and price filters. Refresh to confirm query values remain in the URL.
2. Open `/products/id/1` and `/products/smart-watch`. Both should show the same watch. Try an unknown ID and slug for the missing-product state.
3. Add an item, open the bag, change quantity, and refresh. Check the saved quantity, stock limit, subtotal, delivery, and navigation count. Remove all items to see the empty state.
4. While signed out, visit `/checkout`. Expect `/login`; submit sample details and expect a return to checkout.
5. Submit a sample delivery address. Expect one demo order, correct totals, a confirmation, and an empty bag. Refresh order history to confirm persistence.
6. Sign out, visit `/orders`, and expect sign-in. Sign in with another email to see its separate demo history; the original email can see its earlier orders again. This is not secure account isolation.
7. Try narrow screens, keyboard navigation, and direct refreshes on detail routes.

## Deployment and production work still needed

This repository builds a static frontend. When hosting `dist/`, configure the host to serve `index.html` for non-file routes; otherwise direct visits or refreshes at `/products/smart-watch` can return a server 404. Vite handles this during local development.

For a real commerce service, replace the browser demo layer with:

- Server-backed catalog, users, and orders in a database.
- Real authentication and server-side authorization, including order ownership checks.
- Server validation and calculation of prices, inventory, delivery, and applicable taxes.
- Payment-provider integration, verified webhooks, and idempotent order/payment handling.
- Durable inventory reservations, fulfillment and cancellation/refund workflows.
- Appropriate customer-data handling, support details, and store policies.

Keep payment secrets on the server. The server should receive product IDs and quantities and look up trusted prices itself. Browser totals, route guards, and localStorage must never be treated as proof of payment, identity, or inventory availability.
