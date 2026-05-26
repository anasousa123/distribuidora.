```javascript id="l8v2mz"
import { initializeApp }

from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore }

from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "SUA_API_KEY",

authDomain: "SEU_PROJETO.firebaseapp.com",

projectId: "SEU_PROJECT_ID",

storageBucket: "SEU_PROJETO.appspot.com",

messagingSenderId: "123456789",

appId: "SEU_APP_ID"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
```
