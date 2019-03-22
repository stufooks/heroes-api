# Heroes API

## Usage

An API for searching a database of superheroes. You can search by name, power, or universe.

All requests should be made as a GET request to ```https://secure-refuge-20328.herokuapp.com/heroes```

The request should include a 'type' and a 'value' in the body of the request formatted as 'application/json'. The 'type' is what you want to search by, and must be 'name', 'power', or 'universe'. The value is what you want to search for and can be any String.

## Exmaple Body

```
{
	"type": "universe",
	"value": "Marvel"
}
```

