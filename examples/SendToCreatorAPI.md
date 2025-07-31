⏺ Creator API Integrációs Útmutató

  Környezeti Konfiguráció (.env)

  # Creator System Configuration
  CREATOR_URI=https://creator.gy-dev.dev.spartancode.hu
  CREATOR_TOKEN_URL=https://auth.dev.spartancode.hu/auth/realms/
  spartan/protocol/openid-connect/token
  CREATOR_AUTH_BASIC=YXBpLXNlcnZpY2UtY2xpZW50OkRwdWRqYjlrRnlaOW1
  sSktMV0daVTBaQ1ZPbjc5aGYw

  API Authentikáció

  1. OAuth Token Megszerzése

  const tokenResponse = await axios.post(
    process.env.CREATOR_TOKEN_URL,
    'grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic 
  ${process.env.CREATOR_AUTH_BASIC}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  const accessToken = tokenResponse.data.access_token;

  Űrlap Küldés Creator API-nak

  Endpoint URL

  POST ${CREATOR_URI}/api/Dynforms/post-form-designer-schema

  Valós URL: https://creator.gy-dev.dev.spartancode.hu/api/Dynfo
  rms/post-form-designer-schema

  Kritikus Formátum Követelmények

  FONTOS: A Creator API csak Form Data formátumot fogad el, nem
  JSON-t!

  // Form Data készítése
  const formData = new FormData();
  formData.append('schema', JSON.stringify(formStructure));

  // HTTP Request
  const response = await axios.post(
    `${process.env.CREATOR_URI}/api/Dynforms/post-form-designer-
  schema`,
    formData,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Cache-Control': 'no-cache, no-store, max-age=0',
        'Referer':
  `${process.env.CREATOR_URI}/form-designer/create`,
        'Routed-Url': `${process.env.CREATOR_URI}/form-designer/
  create?route=form-designer%2Fcreate&language%5Bid%5D=2`,
        'X-Requested-With': 'XMLHttpRequest',
        ...formData.getHeaders()
      }
    }
  );

  Kötelező HTTP Headers

  {
    'Authorization': `Bearer ${accessToken}`,
    'Cache-Control': 'no-cache, no-store, max-age=0',
    'Referer': `${CREATOR_URI}/form-designer/create`,
    'Routed-Url': `${CREATOR_URI}/form-designer/create?route=for
  m-designer%2Fcreate&language%5Bid%5D=2`,
    'X-Requested-With': 'XMLHttpRequest'
  }

  Schema Struktúra Template

  const formStructure = {
    "form": {
      "_id": null,  // Mindig null új form esetén
      "name": "Űrlap Név",
      "tableName": "-generate-",  // KRITIKUS: Creator generálja
   a táblanevet
      "meta": {
        "url": `ai_form_${Date.now()}`  // Egyedi URL 
  timestamp-pel
      }
    },
    "fields": [
      {
        "type": "text",
        "name": "VEZETEKNEV",
        "label": "Vezetéknév",
        "required": true,
        "validation": {
          "minLength": 2,
          "maxLength": 50
        }
      }
      // További mezők...
    ]
  };

  Válasz Feldolgozás

  Sikeres Létrehozás

  if (response.data?.success === false &&
      response.data?.message?.includes("The _id field cannot be 
  changed")) {
    // Ez normális válasz - űrlap sikeres létrehozva
    console.log('Form successfully created');
  }

  URL Kinyerés

  const formUrl = response.data?.meta?.url;
  const editUrl = `${process.env.CREATOR_URI}/form-designer/upda
  te?mongoId=${formId}`;

  Teljes Példa Implementáció

  async function sendFormToCreator(formStructure) {
    try {
      // 1. Token megszerzése
      const tokenResponse = await axios.post(
        process.env.CREATOR_TOKEN_URL,
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic 
  ${process.env.CREATOR_AUTH_BASIC}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // 2. Form Data készítése
      const formData = new FormData();
      formData.append('schema', JSON.stringify(formStructure));

      // 3. Űrlap küldése
      const response = await axios.post(
        `${process.env.CREATOR_URI}/api/Dynforms/post-form-desig
  ner-schema`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Cache-Control': 'no-cache, no-store, max-age=0',
            'Referer':
  `${process.env.CREATOR_URI}/form-designer/create`,
            'Routed-Url': `${process.env.CREATOR_URI}/form-desig
  ner/create?route=form-designer%2Fcreate&language%5Bid%5D=2`,
            'X-Requested-With': 'XMLHttpRequest',
            ...formData.getHeaders()
          }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Creator API error: ${error.message}`);
    }
  }