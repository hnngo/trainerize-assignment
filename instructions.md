# Instructions:

Using the API below, which will fetch Github gists, display each user’s avatar (owner.avatar_url) and file name (files.xxx) in a list.
The list needs to be high performance, well structured, and easy to maintain. The app has been scaffolded with Redux for state management and Redux-Observable (RxJS based middleware) for asyncrounous data fetching. Please utilitize the provided actions in the component(s) you develop.

## Each line item:
- Profile image from array[n].owner.avatar_url
- File Name from array[n].files.xxx

## API: https://api.github.com/gists/public

### Page query options:
- since=YYYY-MM-DDTHH:MM:SSZ
- per_page=30
- page=2

API Doc: https://developer.github.com/v3/gists/#list-all-public-gists

## Givin:
- App scaffolding is provided
- Redux store and Epic structure is configured using Redux and Redux-Observable libraries
- Store actions are provided for reducer state
- Epic action is already provided for fetching gist data, utilized from Api services

## Requirement:
- Layout should be reasonably responsive.
- Preferred to be written in Typescript, as the project sample has been created.
- Please limit the use of external libraries. If you find one necessary, please provide your reason for using it.
- Page the gist data using infinite scroll, ie. scrolling to the bottom of the data list will result in calling the API again and fetching additional pages of data.

### Bonus:
- Modify the epic structure to improve the fetching flow - i.e. dispatch a load more event instead of a loading event when the user scrolls to fetch additional data and have the UI reflect this:
    - append a loader to the data instead of a full page loader
    - add a page separator row inticating the data page (page 1, page 2 etc.)