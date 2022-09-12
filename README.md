# Fixed-Asset-Management
Fixed Asset Management is a web application that consist of 3 parts:
> the front-end\\
> the back-end\\
> the authentication midleware keycloak\\
This application was developed during the preparation of my diploma thesis for the department of University of Thessaly electrical and computer engineering.
Is an application capable to manage fixed assets and daily transactions.
***********************************************************************************************************************************************************************
FUNCTIONALITY



Teams mode: The user can create a team to share fixed assets and transactions. It is useful for teams with common transactions and fixrd asset and also for companies.
The user can delete the team and with thiw action all the data that belong to the team are deleted too. User can get a unique code for each team. User can also join a team 
with this unique code or unjoin from a team that he is already member. Moreover he cam choose to connect as team to add,delete or update the data that belongs to team.
At any time user can choose to connect again as single user.

Accounts mode: User can add his accounts with the money that they have. He can update or delete each acocunt.

Transactions mode: User can add a daily transaction either income or expense. He can choose the day from the diary and for each day he cam see the daily transactions. Also
 a pie diagram is available with the data of moth expenses. Each transactions belong to an account and when the user add an income the money of the account are rising. When
 he add an expense the money is decreasing. In each update the accounts are also up to dated.
 
 Settings mode: If a user is connected as single user he can change the data of his profile. If he is connected as a team he can change team name. Both ways he can add, create 
 or delete different scenarios-categories for incomes and outcomes. This scenarios is used when someone add a transaction and he must pick an account and a category for each
 transaction. For each scenario user pick an image and a color.
 
 Fixed-asset mode: The user can create , update or delete the categories that fixed asset will belong. He can add a fixed asset, update or delete it. He can also take a qr 
 code for each fixed asset that leads to the update page. The qr code can be download as image. 
 
 
 *************************************************************************************************************************************************************************
 FUTURE WORK
 > Add image for each fixed asset
 > Add receipt for each transaction and for each fixed-asset
 > Search bar and filters for fixed asset
 > A.I. algorithm for expenses predictions.
*******************************************************************************************************************************************************************************
RUN THE APP

open 3 terminal one for each folder
> On keycloak folder run bin/kc.sh start-dev
> On bakc_management folder run npm i and then npm run dev
> On front_management folder run npm i and then npm start
