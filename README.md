# Visual Analysis of the World Cup

This project is the second assignment of COMP5048 Visual Analyics (round 2017-S2 at the University of Sydney) by Group 3, with group members: Ruoyu Zhuang, Shaowei Zhang, Bo Wang, Chengcheng Zhou, Shanshan Ding and Dongqi Wu.

The main aim of this project is to better understand the World Cup data and learn the potential structure of it. Following targets are defined:

* Investigate possible structure of the involved countries regarding their relative strengths.
* Visualize results between two specific countries from their historical match results.
* Define the relationship between geographical location and team performance.
* Explore underlying performance cycle of some selected countries.
* Uncover most correlated factors of the performance of the countries.

Several platforms, libraries and programming languages are involved in this project: **D3.js**, **NetworkX**, **Tableau**, **Python**, **JavaScript**, **CSS**, **HTML** and **R**. Scripts here might be written in any of them and some of the interactive images are generated or published through these tools.

## How to run
Internet connection and a localhost server are required to make the whole system work well within a web browser.

1. Connect to the Internet please because the source of D3.js libraries are online.
2. Open the command line and navigate to this folder. Run a server and access the home page "index.html" through localhost with a browser. A localhost server can be started by python3 with the command:
```
python3 -m http.server 8888
```

## Dataset
The raw data are not given here, but can be achieved through:
1. History of the World Cup
This dataset is provided in [14th Graph Drawing Contest (2006)](http://gd2006.iti.kit.edu/contest/). The World Cup dataset contains both hierarchical components and non-hierarchical components. The hierarchical elements describe the ranking of 79 participated countries in each of past 18 World Cup from 1930 to 2006. On the other hand, rankings of teams participated in different World Cup could be recognized as the non-hierarchical components.
2. Top Scorers
The dataset is manually collected through the websites, which contains cleaned top scorer's records which consist of the nationalities of the top scorers and goals they scored in each season of Bundesliga, La Liga, Serie A and each European Champion Clubs Cup from the 1960s to 2006.

## Overview of Each Visualization Method
