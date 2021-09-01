# Dashboard: Graded Task 1

This will be the first graded task of your CS 303(P) Lab. In this task you would be creating a portfolio using the concepts learnt in labs. You would learn how to create forks, switch branches and send Pull Requests. The details regarding making portfolio is shared on LMS. The submission details are also in the v2 in LMS. This repository would act as the submission point for your portfolio. Read ahead carefully to understand the details.

## Step 1: Fork the Repository

- Click on the fork button which is present on the top right of the [repository dashboard](https://github.com/CS-303-P-Software-Engineering-Lab/dashboard).
- You will now have your personal fork.

## Step 2: Commit changes
- Find the `.json` file name corresponding to your roll number in the `data/jsons` folder.
    - For example if your roll number is `IMT2019001`, the file you are looking for is in the path `data/jsons/IMT2019001.json`
- Change the details in your corresponding JSON files. The details asked in the JSON files are
    - name: Your name.
    - github_link: Your portfolio's github link.
    - website_link: Your portfolio's link. Make sure it is in the format `http://<website url>.domain` or `https://<website url>.domain`
        - Valid URLs: `http://octocat.github.io/`, `https://www.google.com`
        - Invalid URL format: `www.google`, `google.com`, `www.google.com`
- Commit the file.

## Step 3: Send a Pull Request
- Come back to the forked repo's dashboard.
- You will find a `Contribute` button. Click on Open Pull Request.
- Send pull request to the `dev` branch of the [repository dashboard](https://github.com/CS-303-P-Software-Engineering-Lab/dashboard).
- Click on Pull Request and add comments if you like to.

## Check your changes
- Once you have performed all these changes, the PR will be merged within 24 hrs.
- Do get in touch with the TAs if your PR has not been merged within 24 hrs.
- If your PR is merged, you should be able to see the changes on the website within 1 min.
- Once you have done all these, checkout your friends' portfolios on [imt2019.vercel.app](https://imt2019.vercel.app)

PS: Mobile Users please pardon my CSS

## Developer comments

### Working model

- Made using Next.js and ChakraUI
- Images are loaded using NextImage component, advantages are that it is available in a webp format and they are lazy loaded by default, which is a very much required feature as you have dozens of images in the app, and you dont want to waste time loading all the images in the page.
- JSON files are updated by students in `dev` branch. My backend script, pulls those changes, switches to main branch, merges dev to main, and saves the images in `webimage/IMT201xxxx` folder. This is completely done using the REST API that Github provides.
- The images are generated using a package called Pageres available on npm. It crops an image to a specified size given the website. It then pushes the updates from local `main` to remote `main` branch.
- This is hosted on vercel. Vercel then deploys the `main` branch.

### Possible updates
- Stream the images from server side instead of saving it in a repository.
