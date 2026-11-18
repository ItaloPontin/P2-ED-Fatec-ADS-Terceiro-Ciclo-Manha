"""
Comparação entre os algoritmos Merge Sort e Quick Sort.

O programa implementa os dois algoritmos explicitamente (sem usar
``sorted()``, ``.sort()`` ou bibliotecas de ordenação) e conta o número de
comparações entre elementos feitas por cada um, para evidenciar o
comportamento assintótico em diferentes cenários.

"""

import random


def merge_sort(vetor: list[int]) -> tuple[list[int], int]:
    """
    Ordena um vetor utilizando o algoritmo Merge Sort (dividir e conquistar).

    O vetor é dividido ao meio recursivamente até restarem listas de tamanho
    0 ou 1; depois, as metades são intercaladas de forma ordenada.

    Complexidade de tempo: O(n log n) em todos os casos.
    Complexidade de espaço: O(n), por causa das listas auxiliares.

    Args:
        vetor: Lista de inteiros a ser ordenada. Não é modificada.

    Returns:
        Uma tupla ``(vetor_ordenado, comparacoes)``, onde ``comparacoes`` é
        o total de comparações entre elementos realizadas na intercalação.
    """
    comparacoes = 0

    def dividir(lista: list[int]) -> list[int]:
        """
        Divide a lista ao meio, ordena cada metade recursivamente e
        intercala os resultados, incrementando o contador de comparações.

        Args:
            lista: Sublista a ser ordenada.

        Returns:
            Nova lista com os elementos de ``lista`` em ordem crescente.
        """
        nonlocal comparacoes

        # Caso base: lista vazia ou com um elemento já está ordenada
        if len(lista) <= 1:
            return lista

        meio = len(lista) // 2

        esquerda = dividir(lista[:meio])
        direita = dividir(lista[meio:])

        resultado: list[int] = []
        i = 0
        j = 0

        # Intercala as duas metades ordenadamente
        while i < len(esquerda) and j < len(direita):
            comparacoes += 1

            if esquerda[i] <= direita[j]:
                resultado.append(esquerda[i])
                i += 1
            else:
                resultado.append(direita[j])
                j += 1

        # Sobras: apenas uma das metades ainda tem elementos (sem comparação)
        resultado.extend(esquerda[i:])
        resultado.extend(direita[j:])

        return resultado

    ordenado = dividir(vetor.copy())

    return ordenado, comparacoes


def quick_sort(vetor: list[int]) -> tuple[list[int], int]:
    """
    Ordena um vetor utilizando o algoritmo Quick Sort.

    Utiliza o último elemento como pivô. Os demais elementos são separados
    em ``menores`` (<= pivô) e ``maiores`` (> pivô), e cada grupo é ordenado
    recursivamente.

    Complexidade de tempo:
        - Melhor e caso médio: O(n log n), quando as partições são
          equilibradas.
        - Pior caso: O(n²), quando o pivô é sempre o menor ou o maior
          elemento (ex.: vetor já ordenado com pivô no final).
    Complexidade de espaço: O(n), pois esta versão usa listas auxiliares
    (não é in-place).

    Args:
        vetor: Lista de inteiros a ser ordenada. Não é modificada.

    Returns:
        Uma tupla ``(vetor_ordenado, comparacoes)``, onde ``comparacoes`` é
        o total de comparações entre elementos e pivôs.
    """
    comparacoes = 0

    def ordenar(lista: list[int]) -> list[int]:
        """
        Escolhe o pivô, particiona a lista e ordena as partições
        recursivamente, incrementando o contador de comparações.

        Args:
            lista: Sublista a ser ordenada.

        Returns:
            Nova lista com os elementos de ``lista`` em ordem crescente.
        """
        nonlocal comparacoes

        # Caso base: lista vazia ou com um elemento já está ordenada
        if len(lista) <= 1:
            return lista

        pivo = lista[-1]

        menores: list[int] = []
        maiores: list[int] = []

        # Compara cada elemento (exceto o pivô) com o pivô
        for elemento in lista[:-1]:
            comparacoes += 1

            if elemento <= pivo:
                menores.append(elemento)
            else:
                maiores.append(elemento)

        return ordenar(menores) + [pivo] + ordenar(maiores)

    ordenado = ordenar(vetor.copy())

    return ordenado, comparacoes


def testar_algoritmos(nome: str, vetor: list[int]) -> None:
    """
    Executa Merge Sort e Quick Sort sobre o mesmo vetor, confere se o
    resultado está correto e imprime o resultado e o total de comparações.

    Args:
        nome: Nome do cenário de teste (usado apenas na impressão).
        vetor: Lista de inteiros a ser ordenada pelos dois algoritmos.
    """
    resultado_merge, operacoes_merge = merge_sort(vetor)
    resultado_quick, operacoes_quick = quick_sort(vetor)

    # Verificação de corretude (sorted usado apenas para conferir)
    assert resultado_merge == sorted(vetor), "Merge Sort ordenou incorretamente"
    assert resultado_quick == sorted(vetor), "Quick Sort ordenou incorretamente"

    # Vetores grandes são abreviados para não poluir a saída
    def resumir(lista: list[int]) -> str:
        """Retorna a lista completa ou uma versão abreviada se for longa."""
        if len(lista) <= 20:
            return str(lista)
        return f"{lista[:5]} ... {lista[-5:]} (n = {len(lista)})"

    print("\n===================================")
    print("CENÁRIO:", nome)
    print("Vetor original:", resumir(vetor))

    print("\nMERGE SORT")
    print("Resultado:", resumir(resultado_merge))
    print("Total de comparações:", operacoes_merge)

    print("\nQUICK SORT")
    print("Resultado:", resumir(resultado_quick))
    print("Total de comparações:", operacoes_quick)
    print("===================================")


if __name__ == "__main__":

    # TESTE 1: Caso comum
    # Vetor pequeno com números desordenados.
    caso_comum = [8, 3, 5, 1, 9, 2, 7, 4, 6]
    testar_algoritmos("Caso comum", caso_comum)

    # TESTE 2: Caso de borda (vetor vazio)
    # Sem elementos para ordenar: ambos devem fazer 0 comparações.
    caso_vazio: list[int] = []
    testar_algoritmos("Caso de borda - vetor vazio", caso_vazio)

    # TESTE 3: Caso de borda (um único elemento)
    # Já está ordenado: 0 comparações.
    caso_unitario = [42]
    testar_algoritmos("Caso de borda - um elemento", caso_unitario)

    # TESTE 4: Caso de borda (elementos repetidos)
    # Verifica se a ordenação lida corretamente com valores iguais.
    caso_repetidos = [5, 3, 5, 1, 3, 5, 1, 1]
    testar_algoritmos("Caso de borda - elementos repetidos", caso_repetidos)

    # TESTE 5: Pior caso para o Quick Sort
    # Vetor já ordenado com 100 elementos. Como o último elemento é o pivô
    # (sempre o maior), as partições ficam totalmente desequilibradas:
    # Quick Sort faz n(n-1)/2 = 4950 comparações (O(n²)), enquanto o
    # Merge Sort continua em O(n log n).
    pior_caso = list(range(1, 101))
    testar_algoritmos("Pior caso (Quick Sort) - vetor ordenado, n = 100", pior_caso)

    # TESTE 6: Caso médio com vetor grande e aleatório
    # Semente fixa para o resultado ser reproduzível. Aqui o Quick Sort
    # se aproxima do Merge Sort, mostrando o comportamento O(n log n).
    random.seed(42)
    caso_aleatorio = random.sample(range(1, 1001), 100)
    testar_algoritmos("Caso médio - vetor aleatório, n = 100", caso_aleatorio)