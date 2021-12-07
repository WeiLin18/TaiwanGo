# TaiwanGo
This site is developed by [Next.js](https://nextjs.org/) and [React.js](https://reactjs.org/), integrated third-party API from [MOTC Transport API](https://ptx.transportdata.tw/MOTC?t=Tourism&v=2).
### Description:
This is an informational website. On TaiwanGo, users can quickly search traveling information, like tourist spots, restaurants, and activities in Taiwan.

### Demo link:
https://quizzical-allen-890ea7.netlify.app/


### Screenshots

![homePage](./docs/homePage.png)
![listPage](./docs/listPage.png)
![detailsPage](./docs/detailsPage.png)

### Resource 
- [Mockup](https://www.figma.com/file/YQ0Q6Gbj8YRVSntbVXcTPy/Week-1-%7C-%E5%8F%B0%E7%81%A3%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E%E5%B0%8E%E8%A6%BD?node-id=0%3A1) (original version) - there are some adjustments on the site.
- [API Swagger](https://ptx.transportdata.tw/MOTC?t=Tourism&v=2)
### Technologies 
- Base:  
   - HTML / CSS / JavaScript
- Framework: 
   - [Next.js](https://nextjs.org/) / [React.js](https://reactjs.org/)


#### Dependencies
- [Material-UI](https://mui.com/)
- [Leaflet](https://leafletjs.com/)
- [Emotion](https://emotion.sh/docs/introduction)
- [axios](https://github.com/axios/axios)
- [jssha](https://github.com/Caligatio/jsSHA)
- ... ( see `package.json` for details )

#### Dev Dependencies
- [Husky](https://github.com/typicode/husky)
- [Prettier](https://prettier.io/)
- [ESlint](https://eslint.bootcss.com/)
- [commitlint](https://github.com/conventional-changelog/commitlint)
- [babel](https://babeljs.io/)
- ... ( see `package.json` for details )

### Features
-  `2.0.0` (in progress)
   - integrate leaflet for map features
   - add some animations in HomePage
 - `1.0.0` (latest released)
   - implement HomePage / ListPage / DetailsPage
   - integrate API for fetching traveling information
   - implement SSR in DetailsPage
   - implement search / add to favorites / show more items / dropdown select / RWD

### Setup
- Download or clone the repository
- Install dependencies
  ```bash
  yarn install
  ```
- Run the development server:

  ```bash
  yarn dev
  ```
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the homePage.



### Contributors
- Front-end developer: [Wei Lin](https://github.com/WeiLin18)
- UX / UI designer: [Rey Chang](https://2021.thef2e.com/users/6296427084285739362)
- Source API: [Taiwan Public Transport data eXchange](https://ptx.transportdata.tw/PTX/)



