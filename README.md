<div align=center>
    <h1 align=center>
        <img align=center
            src="https://github.com/Triple-A-Team/PublicBeef/blob/master/public/images/android-chrome-192x192.png?raw=true"
            alt="PublicBeef logo">
        <br>
        PublicBeef
        <br>
    </h1>
    <p style="font-size: 1.35rem; font-weight: 500; padding: 2rem; text-align: center"> Public Beef makes it easy to start some beef with local beefers!  No longer will you have to beef unanswered, but you can find local people to beef with!</p>
    <br>
    <a align=center href="https://heroku.com/deploy?template=https://github.com/andresmweber/publicbeef">
        <img alt="deploy" src="https://www.herokucdn.com/deploy/button.png">
    </a>
</div>


# Setup
### Installation
*   Clone the [repo]('https://github.com/Triple-A-Team/PublicBeef')
*   Install the server dependencies with: ```npm install```
*   Run the local server using ```npm run start```
*   Open ```http://localhost:7000``` and Have fun!

### Environment Variables
#### Set up API Access
*   Obtain a [Google Maps API Key](https://cloud.google.com/maps-platform/?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_277743457142-ADGP_Hybrid+%7C+AW+SEM+%7C+SKWS+~+Mapping+APIs-KWID_43700037731655637-kwd-297933066873-userloc_9012021&utm_term=KW_%2Bmaps%20%2Bapi-ST_%2Bmaps+%2Bapi&&gclid=CjwKCAjw2qHsBRAGEiwAMbPoDBcMn9HGXQzC6340gfWce5za7bizaU4P5o4cHH4QBsEJFtemcCL5WhoC4UQQAvD_BwE)
*   Create a [Mongo DB Cluster](https://cloud.mongodb.com/)
*   Create a [Heroku App]('https://heroku.com')
*   Set the following environment variables on | [mac](https://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion) | [windows](https://superuser.com/questions/1334129/setting-an-environment-variable-in-windows-10-gpodder) | [linux](https://stackoverflow.com/questions/45502996/how-to-set-environment-variable-in-linux-permanently) |
*   ^ Or just use a .env file in the root directory

| Environment Variables        | Description                                         |
| ---------------------------- |:--------------------------------------------------- |
| PORT                         | Port for the backend express server                 |
| MONGODB_URI                  | URI to log into mongodb                             |
| GOOGLEMAPS_API_KEY           | API Key for google maps.                            |
| NODE_ENV                     | (Optional) Can be Production to set production mode |
| SESSION_SECRET               | (Optional) Secret phrase for Session                |

# Authors
- [Alejandro Gomez](https://github.com/alegomez1)
- [Andres Weber](https://github.com/AndresMWeber)
- [Adrian Vesnieski](https://github.com/adriansdk)

