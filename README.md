# Visual Analysis of the World Cup

This project is the second assignment of COMP5048 Visual Analyics (round 2017-S2 at the University of Sydney) by Group 3, with group members: Ruoyu Zhuang, Shaowei Zhang, Bo Wang, Chengcheng Zhou, Shanshan Ding and Dongqi Wu.

The main aim of this project is to better understand the World Cup data and learn the potential structure of it. Following targets are defined:

* Investigate possible structure of the involved countries regarding their relative strengths.
* Visualize results between two specific countries from their historical match results.
* Define the relationship between geographical location and team performance.
* Explore underlying performance cycle of some selected countries.
* Uncover most correlated factors of the performance of the countries.

In general, 6 visualization methods are implemented in this project and combined in a system through html. The folders in */links/* correspond to different visualizations.

![Image of home page](https://github.com/ZhuangRuoyu/Visual-Analysis-of-World-Cup/blob/master/images/screenshot/home.jpg)


1. Main Visualization (*/links/main*)

The main visualization is aiming at providing general information of all participated countries (from 1930 to 2006) with a concentric circular layout. Such layout should be able to reveal relative strengths among teams, and historical match results between any two of the teams are quantified via edge design.



Teams from the same confederation are located adjacent to each other with the same color. Nodes stand for various participating countries where stronger teams are revealed with larger sizes. Edge thickness indicates the number of historical matches between two teams where thicker edge means more matches happened between the two countries.

In addition, green end of the edge indicates the outperformed team. When a certain node is selected, edges connected to that node would be emphasized. Meanwhile, its tooltip would show up, including its name, responding confederation and participated years.

2. Previous World Cup Results Tree Visualization

Tree visualization is employed for each previous World Cup. The result for every team from each round of the game is located in the corresponding depth of the tree (e.g., winner positioned at root). However, group stage is processed separately due to its circular relationship.


The match results are analyzed by radial tree layout. Every team is represented by a unique color. The path of its color shows the match results and the color of the centroid represents the champion.

3. Timeline overview

The timeline overview outlines the performance of teams in each World Cup, which potentially reveals the performance of football in a certain period. In addition, continental based football confederation performance has been investigated in a similar way.


Timeline overview shows team performance over each world cup which potentially uncovers the football performance period. Also, continental (football confederation) based performance over time would be investigated in a similar way.

4. Geo-centroid of country performance

The geo-centroid of country performance is aiming at revealing the relationship between the geographical location and the team performance. Rank of each team is quantified and visualized as points on a real world map with different circle radius. The barycentre of these points shows the approximate orientation of the leading football level.



The geo-centroid of country performance is aiming at revealing the relationship between geographical location and team performance. The barycentre of these points shows the approximate orientation of the leading football level.

5. Heat Map of Relationship between Participation Times and Team Performance

The heat map visualization would indicate whether there is a significant relationship between participation times and team performance in the world cup.

6. Relationship between Star Performance and World Cup Ranking

External dataset containing top scorers of each year’s football club leagues is included in this visualization. The weighted number of top scorers from each national team is projected onto the same timeline in timeline overview. This visualization targets at exploring a possible correlation between top scorer and team world cup ranking.

The trends of the two lines are similar. Therefore, the number of top scorers is a possible factor influencing the ranking of World Cup.


## Tools
Several platforms, libraries and programming languages are involved in this project: **D3.js**, **NetworkX**, **Tableau**, **Python**, **JavaScript**, **CSS**, **HTML** and **R**. Scripts here might be written in any of them and some of the interactive images are generated or published through these tools.

## Datasets
The raw data are not given here, but can be achieved through:
1. History of the World Cup

This dataset is provided in [13th Graph Drawing Contest (2006)](http://gd2006.iti.kit.edu/contest/). The World Cup dataset contains both hierarchical components and non-hierarchical components. The hierarchical elements describe the ranking of 79 participated countries in each of past 18 World Cup from 1930 to 2006. On the other hand, rankings of teams participated in different World Cup could be recognized as the non-hierarchical components.
2. Top Scorers

The dataset is manually collected through the websites, which contains cleaned top scorer's records which consist of the nationalities of the top scorers and goals they scored in each season of Bundesliga, La Liga, Serie A and each European Champion Clubs Cup from the 1960s to 2006.

## How to run
Internet connection and a localhost server are required to make the whole system work well within a web browser.

1. Connect to the Internet please because the source of D3.js libraries are online.
2. Open the command line and navigate to this folder. Run a server and access the home page "index.html" through localhost with a browser. A localhost server can be started by python3 with the command:
```
python3 -m http.server 8888
```
