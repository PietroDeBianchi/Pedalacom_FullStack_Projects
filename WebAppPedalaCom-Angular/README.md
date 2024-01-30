pedalacom 
# REGOLAMENTO ALL'USO DI GIT

1. **NON SI PUSHA SU MAIN**
   - penalità: vi gestite voi il revert
2. **NON SI PUSHA SU DEVELOPMENT**
   - penalità: vi gestite voi il revert

---

### _regole di push_

1. *due branch al giorno*
2. *vari commit sulla stessa branch*
    - un commit per ogni update principale *funzionante*
**NOMENCLATURA BRANCH**

- dev-_nome_-_argomento_
- es: dev-den-Customers

<table>
    <tr>
        <td> nome </td>
        <td> nome da usare </td>
    </tr>
    <tr>
        <td> denys </td>
        <td> den </td>
    </tr>
    <tr>
        <td> tony </td>
        <td> tony </td>
    </tr>
    <tr>
        <td> christian </td>
        <td> chri </td>
    </tr>
    <tr>
        <td> pietro </td>
        <td> pie </td>
    </tr>
    <tr>
        <td> gabriele </td>
        <td> gabry </td>
    </tr>
</table>

# ISTRUZIONI GITHUB

### clonare una repositori 

`git clone https://github.com/D3ENNY/pedalacom`

## pushare su github

### creare una branch

`git branch *nome branch*`

### entra nella branch

`git checkout *nome branch*`

### fare l'add di tutte le modifiche

`git add .` 
- dove . sta per tutte le modifiche contenute in questa directory in cui mi trovo e nelle sotto direcotry di essa
- nel caso in cui tu non abbia creato nuovi file (ne tu, ne qualche tool che stai usando come ng) e quindi tutti i file sono conosciuti a git, puoi saltare questo passaggio

### commit delle modifiche

`git commit -am "messaggio del commit"`
- la flag `a` sta ad indicare che stai per committare tutte le modifiche
- la flag `m` sta ad indicare nel caso in cui ti fa l'add automatico dei file già conosciuti a git

### push delle modifiche

`git push` 
- potrebbe dare un errore dicendo che la branch non è `upstream`, copia il comando che ti sta dando e reincollalo nel terminale

il comando sarà simile a questo: 
`git push --set-upstream *nome branch*`