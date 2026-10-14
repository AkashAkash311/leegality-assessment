# ShopList – Product Listing & Detail Page

Frontend assessment for Leegality: a small Amazon-style product listing app built with React,
using the [DummyJSON products API](https://dummyjson.com/docs/products).

- **GitHub:** https://github.com/AkashAkash311/leegality-assessment
- **Demo:** https://leegality-assessment-eight.vercel.app/

## Features

- Product listing page with a filter sidebar, product grid and pagination
- Filters: category (loaded from the API), min / max price, and multiple brands
- Filters work together, apply immediately and reset pagination to page 1
- Product detail page (`/product/:id`) with image gallery, price, rating, brand, category,
  description and reviews
- Back button returns to the listing with the same filters and page
- Search by product title from the header
- Loading, error and "no results" states

## Setup instructions

Requirements: Node.js 18+ and Yarn.

```bash
git clone https://github.com/AkashAkash311/leegality-assessment.git
cd leegality-assessment
yarn install
yarn start
```

The app runs at http://localhost:3000.

To create a production build:

```bash
yarn build
```

The output is in the `build/` folder.

## Project structure

```
src/
  api/index.js            getApiCaller – common fetch helper for DummyJSON
  hooks/useFilters.js     reads / writes filter state in the URL
  components/             Header, FilterSidebar, PriceFilter, ProductGrid, ProductCard,
                          Pagination, Rating, Button, StatusMessage
  pages/                  ProductListPage, ProductDetailPage
  utils/format.js         price and category formatting
  theme.js                shared colours and sizes used by the styles
```

## Assumptions made

- **Category is single-select** (radio buttons), because each category maps to one API
  endpoint (`/products/category/{slug}`). Brand is multi-select.
- **Selecting a category clears the selected brands**, since the brand list is built from
  that category's products and the old brands may not exist in it.
- **Price filter applies automatically** about half a second after the user stops typing,
  instead of using an Apply button, to match "changing a filter should update the list
  immediately". Min and max are inclusive. If min is greater than max, no products are shown
  and a small warning appears.
- **Some products have no brand.** They show up when no brand is selected, are hidden as soon
  as a brand is selected, and show "N/A" on the detail page.
- **Search** is a simple case-insensitive match on the product title, and it works together
  with the other filters.
- **Reviews** are shown on the detail page because they are in the design, even though the
  requirements don't list them.
- The cart / account icons in the design are decorative, so they were not built.
- 10 products per page.

## Architectural decisions

**Fetch the full list, then filter and paginate on the client.**
DummyJSON can filter by category, but not by price or brand. If pagination used `limit`/`skip`
on the server, the price and brand filters would only apply to the 10 products on the current
page, and the page count would be wrong. So the app loads every product for the selected
category once (`limit=0`), applies brand, price and search filters in the browser, and then
slices the result into pages. The whole catalogue is about 194 products, so this is fast.

**API endpoints used**
- `GET /products?limit=0` – all products (no category selected)
- `GET /products/category/{slug}?limit=0` – products in the selected category
- `GET /products/categories` – category list for the sidebar
- `GET /products/{id}` – product detail page

**Filters are stored in the URL.**
The `useFilters` hook keeps category, brands, price, search and page in the query string
(e.g. `/?category=smartphones&brand=Apple&min=500`). Because of this, filters stay applied
when the user goes to a product and comes back, survive a page refresh, and can be shared as a
link. No global state library (Redux etc.) was needed.

**Back button.**
Product cards pass `fromListing` in the router state. If it is present, Back uses
`navigate(-1)` so the user lands on the exact listing they came from. If the product page was
opened directly from a link, Back goes to `/` instead of leaving the site.

**Single API helper.**
All requests go through `getApiCaller` in `src/api/index.js`. It builds the URL, throws an
error for non-2xx responses (since `fetch` only rejects on network errors), and returns the
parsed JSON. Each page handles its own loading and error state with `useState`.

**Reusable components.**
Pages only hold data and state. Display pieces such as `ProductCard`, `Rating`, `Pagination`,
`FilterSidebar` and `StatusMessage` (used for both error and empty states) receive everything
through props.

**Styling.**
No UI library. Each component has a `styles` object at the top of the file, applied with
inline `style` props, and shared colours / sizes come from `theme.js`. Layouts use flex-wrap
and CSS grid `auto-fill`, so the page adapts to smaller screens without media queries.
`index.css` only holds the base reset and the loading animations.

## Improvements if given more time

- **Tests** – unit tests for the filtering logic and component / integration tests with React
  Testing Library and a mocked API, plus an end-to-end test of the filter → detail → back flow.
- **Server-side filtering** – if the catalogue were large, loading the full list would not
  scale; filtering and pagination would need to move to the backend.
- **Data caching** – use a library such as TanStack Query (React Query) to cache responses,
  avoid refetching when going back, and handle retries.
- **Better filter UX** – multi-select categories, sorting (price, rating), removable
  "active filter" chips, and a collapsible filter panel on mobile.
- **Restore page Number** when returning to the listing page.
- **TypeScript** for API response and prop types.
- **Accessibility pass** – keyboard and screen-reader testing of the filters and pagination.
- **Environment variable for the API URL** instead of a constant in `api/index.js`.
