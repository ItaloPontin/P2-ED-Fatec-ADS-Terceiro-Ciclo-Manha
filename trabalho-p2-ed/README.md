**Vídeo Explicativo**: https://youtu.be/L_AKYPqbibU
 
Link do Simulador Visual: italopontin.github.io/P2-ED-Fatec-ADS-Terceiro-Ciclo-Manha/trabalho-p2-ed/src/demo/

Aluno: Ítalo Pontin Delloiagono e Silva

Curso: Terceiro ADS Manhã

RA: 2840482521027

*Tema Escolhio: Quick Sort Vs. Merge Sort*

**Resumo Teórico do Merge Sort:**
-
*Como o Merge Sort funciona?*
Uma questão muito comum que várias pessoas tem sobre ordenação de um array é "qual a maneira mais eficiente de ordená-la?". Na realidade, existem diversos métodos que podem ser usados para ordenar um vetor, alguns mas fáceis, porém menos eficiente, outros mais complexos, porém consideravelmente bem mais eficiente.
O Merge Sort é um deles, ele segue a ideia de "Divisão e Conquista", que é uma estratégia consiste em quebrar um problema complexo em partes menores, resolver essas partes e juntar os resultados.
O Merge Sort consiste em dividir uma estrutura em subconjuntos e ir aplicando a ordenação nos elementos que foram extraídos da estrutura originaria. Após a ordenação destes subconjuntos, é feita a mistura destes (merge) em um conjunto final ordenado.

*Onde o Merge Sort é utilizado na Vida Real?*
O  Merge  Sort  é  especialmente  interessante  quando  precisamos  ordenar  grandes  volumes  de  dados  com  desempenho  previsível ou estruturas que não cabem inteiramente na memória RAM, por exemplo.
Outro exemplos seguem como Banco de Dados, Sistemas de Arquivos, e também muito interessante: Ordenação  Externa, onde  o  computador  divide  um  arquivo  enorme  em  partes  menores,  ordena  cada  parte  e  depois  faz  a  intercalação  dos  resultados.

**Complexidade Assintótica do Merge Sort:**
Geralmente, os três cenários clássicos do Merge Sort (Melhor Caso, Caso Médio e Pior Caso) são todos classificados na Complexidade de Tempo como **O(n log n)**. Para o Pior Caso, em específico, ser O(n log n), é porque o algoritmo do Merge Sort ***SEMPRE*** vai dividir o vetor no meio, independente dos elementos estarem ordenados ou não.
Agora para a Complexidade de Espaço Auxiliar, os três cenários são classificados como **O(n)**, pois o  Merge  Sort  precisa  de  memória  adicional  para  armazenar  os  elementos  durante  a  intercalação  das  partes.
### Tabela de Complexidade (Merge Sort)

|   Algoritmo  |     Caso    |    Tempo   | Espaço Auxiliar |
|     :---     |     :---    |    :---    |      :---       |
| *Merge Sort* | Melhor Caso | O(n log n) |      O(n)       |
|     :---     | Caso Médio  | O(n log n) |      O(n)       |
|     :---     | Pior Caso   | O(n log n) |      O(n)       |

**Resumo Teórico do Quick Sort:**
-
*Como o Merge Sort funciona?*
Se falarmos de tipo de estratégia, Quick Sort não é muito diferente do Merge Sort, já que usa mesma e famosa estratégia da "Divisão e Conquista" como mencionado anteriormente. Mas, a estratégia pode ser a mesma, porém a maneira de ordenar obviamente não é. Na prática, o Quick Sort é o mais veloz entre os dois.
No Quicksort, Em  vez  de  dividir  a  lista  exatamente  ao  meio,  ele  escolhe  um  elemento  chamado  pivô (pivot) para realizar a ordenação. O pivô é usado como referência para rearranjar os elementos, colocando os menores ou iguais à esquerda e os maiores à direita.
Depois de particionar o vetor com base no pivô, é preciso ordenar as subpartes resultantes. Isso envolve a escolha de um novo pivô, como o último número da subparte, e realizar as comparações de menor ou igual (<=) e maior (>) em relação a esse pivô. Essa abordagem permite dividir o problema inicial em subproblemas menores, aplicando a mesma lógica de "particionamento" e ordenação recursiva até que todo o vetor esteja ordenado.

*Onde o Quick Sort é utilizado na Vida Real?*
Em implementação na vida real, o Quick Sort não é muito diferente do Merge Sort. Em geral, O  Quick  Sort  é  muito  conhecido  por  seu  excelente  desempenho  médio  e  é  utilizado  em  diferentes  contextos  de  processamento  de  dados.
Outro exemplos podem ser: Bibliotecas de programação; Sistemas que trabalham com grandes listas; Processamento de informações, entre outros.
Um fato interessante sobre o Quick Sort é que linguagens  e  bibliotecas  modernas  frequentemente  utilizam  algoritmos  híbridos,  combinando  diferentes  técnicas,  em  vez  de  implementar  o  Quick  Sort  tradicional.

**Complexidade Assintótica do Quick Sort:**
Para os três clássicos cenários de Melhor Caso, Caso Médio e Pior caso, o Quick Sort é ***QUASE*** semelhante ao Merge Sort em Complexidade de Tempo. Enquanto o Melhor Caso e o Caso Médio são **O(n log n)**, o Pior Caso, diferente dos outros dois, tem sua Complexidade de Tempo **O(n²)**. Nesse caso, o algoritmo pode ter um desempenho significativamente mais lento, pois precisa percorrer múltiplas iterações para ordenar corretamente o array ***que já está ordenado!***
No caso da Complexidade de Espaço Auxiliar, para o Quick Sort, pode depender de como ele é implementado. Considerando o *Quick Sort tradicional*, ambos o Melhor Caso e Caso Médio, o Quick Sort segue sendo O(log n), pois Quick Sort utiliza chamadas recursivas para ordenar os grupos. No caso do Pior Caso, segue sendo O(n), pois as divisões ficam extremamente desequilibradas, podendo chegar a *'n'* níveis de recursão.
### Tabela de Complexidade (Quick Sort)

|   Algoritmo  |     Caso    |    Tempo   | Espaço Auxiliar |
|     :---     |     :---    |    :---    |      :---       |
| *Quick Sort* | Melhor Caso | O(n log n) |    O(log n)     |
|     :---     | Caso Médio  | O(n log n) |    O(log n)     |
|     :---     | Pior Caso   |    O(n²)   |      O(n)       |


**Diário de Engenharia com IA.**
-
1. -   Qual modelo/ferramenta você utilizou?
R: Usei duas ferramentas de IA para usos diferente. Para a geração e refinamento do Simulador Visual, foi usado o **Claude AI**. Para perguntas, dúvidas e aprofundamento de pesquisa e conteúdo, foi utilizado o **ChatGPT**.

2. -   Liste os **3 principais prompts** que você usou para aprender o conteúdo e gerar/refinar o simulador.
R: **Prompt para geração do Simulador Visual usando Claude AI**: "Claude, preciso que crie um simulador visual interativo, onde nele há as opções de escolher entre Merge Sort e Quick Sort. No simulador, tem que haver Botões de Executar/Play, Próximo Passo (Step), Pausar e Reiniciar (Restart). Adicione também botões pré-configurados. Por enquanto necessito de três, um que apresente e faça o Melhor Caso, o segundo sendo o Caso Médio, e o último sendo o Pior Caso."
**Prompt usados para refinar e melhorar o Simulador Visual usando Claude AI**: "Muito bem. Vamos fazer algumas pequenas mudanças. Coloque um jeito, tipo um prompt, que possibilite a interação do usuário com o simulador, possibilitando o usuário a criar seu array desejado, em ambos os algoritmos (Merge Sort e Quick Sort). "
**Prompt utilizado ao ChatGPT para arranjar uma base de pesquisa para se aprofundar aos conceitos**: "Como os algoritmos Merge Sort e Quick Sort funcionam? Eles são muito usados hoje em dia? Qual é a principal diferença entre os dois?"

3. -   Relate pelo menos **1 erro, limitação ou ajuste manual** que você precisou corrigir na resposta da IA.
R: **Prompt usado para corrigir os tamanhos das fontes feito no Simulador Visual**: "Além disso, consegue deixar os números no simulador das barras maiores, ou algum jeito mais eficiente que não fique tão difícil de ver?"
