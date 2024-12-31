// Seleciona os elementos
const mainElement = document.querySelector("main");
const button = document.querySelector("#generate-button");
const input = document.querySelector("#sequence-count");

// Função para gerar uma sequência única de números aleatórios
const generateUniqueSequence = (existingSequences) => {
    const sequence = new Set();

    while (sequence.size < 6) {
        const randomNumber = Math.floor(Math.random() * 60) + 1;
        sequence.add(randomNumber);
    }

    const sequenceArray = [...sequence];
    const isUnique = !existingSequences.some(existing => {
        return existing.every((num, index) => num === sequenceArray[index]);
    });

    return isUnique ? sequenceArray : generateUniqueSequence(existingSequences);
};

// Função para gerar o número de sequências especificado
const generateMegaSenaNumbers = () => {
    const sequenceCount = parseInt(input.value) || 9; // Pega o valor do input ou usa 9 como padrão
    const sequences = [];

    // Limpa o conteúdo anterior
    const rows = document.querySelectorAll(".row");
    rows.forEach(row => row.remove());

    // Gera as sequências
    for (let i = 0; i < sequenceCount; i++) {
        const newSequence = generateUniqueSequence(sequences);
        sequences.push(newSequence);

        // Cria um elemento row para exibir a sequência
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");

        newSequence.forEach(num => {
            const span = document.createElement("span");
            span.textContent = num.toString().padStart(2, "0");
            rowElement.appendChild(span);
        });

        mainElement.appendChild(rowElement);
    }
};

// Adiciona evento ao botão
button.addEventListener("click", generateMegaSenaNumbers);

// Gera números ao carregar a página
generateMegaSenaNumbers();
