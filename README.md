# Web Development Project 5 - *AirDash*

Submitted by: **Jawad Chowdhury**

This web app: **lets you see air quality information for up to the past 30 days**

Time spent: **8** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The list displays a list of data fetched using an API call**
- [x] **Data uses the useEffect React hook and async/await syntax**
- [x] **The app dashboard includes at least three summary statistics about the data such as**
  - [x] *Today's AQI*
  - [x] *Average AQI from the last 30 days*
  - [x] *Best AQI from the last 30 days*
  - [x] *Worst AQI from the last 30 days*
- [x] **A search bar allows the user to search for an item in the fetched data**
- [x] **Multiple different filters (2+) allow the user to filter items in the database by specified categories**

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types such as a text input, a selection, or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![Video Walkthrough](./assets/project5gif.gif)

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ShareX 
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Finding an actual API I could use was the worst part of this project. One API I was planning to use didn't have historical data, the other API wasn't free, and even the final API that I landed on had its limitations. It has an AQI scale that isn't US, EU, or of any country's AQI scale, it's just some random scale that was arbitrarily made by the developers. It has its limitations, but its free, and it works well enough.

## License

    Copyright [2023] [Jawad Chowdhury]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.