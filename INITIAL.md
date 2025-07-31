## FEATURE:

A felhasználó instrukciója alapján űrlapot hozunk létre és elküldjök a creator app végpontjának.

## EXAMPLES:

Az `examples/` mappában találunk egy app-new-form.json mintát, ami egy valid űrlap leírót tartalmaz.

## DOCUMENTATION:

Az `docs/` mappában találunk egy formMCP.md file-t, amiben egy működő AI prompt található, ami minden információt tartalmaz, ami ahhoz kell, hogy létrehozzuk az űrlap leíró json file-ját.
Van még egy file, a SendToCreatorAPI.md, ami pedig pontosan leírja, hogy kell elküldeni az így elkészült űrlapot a creator api végpontnak.

## OTHER CONSIDERATIONS:

Készítsünk szabályrendszer, amely pontosan definiálja a folyamatot, hogy ne kelljen elvileg minden egyes alkalommal minden mintát és instrukcióhalmazt újra értelmezni.