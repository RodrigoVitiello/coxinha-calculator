<template>
    <div class="hello">
        <div class="input-group">
            <label for="pessoas">Quantidade de Pessoas</label>
            <input id="pessoas" type="number" placeholder="Pessoas" v-model.number="calculo.pessoas" />
        </div>

        <div class="input-group">
            <label for="aniversariantes">Quantidade de Aniversariantes</label>
            <input id="aniversariantes" type="number" placeholder="Aniversariantes" v-model.number="calculo.aniversariantes" />
        </div>

        <div class="input-group">
            <label for="caixas">Quantidade de Caixas</label>
            <input id="caixas" type="number" placeholder="Caixas" v-model.number="calculo.caixas" />
        </div>

        <div class="input-group">
            <label for="quantidade-por-caixa">Quantidade por Caixa</label>
            <input id="quantidade-por-caixa" type="number" placeholder="Quantidade por caixa" v-model.number="calculo.coxinhasPorCaixa" />
        </div>

        <div class="input-group">
            <label for="valor-caixa">Valor da Caixa</label>
            <input id="valor-caixa" type="number" placeholder="Valor da Caixa" v-model.number="calculo.valorCaixa" />
        </div>

        <div class="input-group">
            <label for="valor-entrega">Valor da Entrega</label>
            <input id="valor-entrega" type="number" placeholder="Valor da Entrega" v-model.number="calculo.valorEntrega" />
        </div>

        <hr />

        <div class="resultado">
            <h2>Resultado</h2>
            <div>
                Valor por pessoa: <span>{{ resultado.valorIndividual }}</span>
            </div>
            <div>
                Coxinhas por pessoa: <span>{{ resultado.coxinhasIndividual }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CoxinhaCalculator',
    data () {
        return {
            calculo: {
                pessoas: 10,
                aniversariantes: 0,
                caixas: 2,
                coxinhasPorCaixa: 100,
                valorCaixa: 22,
                valorEntrega: 6
            },
            resultado: {
                valorIndividual: 0,
                coxinhasIndividual: 0
            }
        }
    },
    created () {
        this.calculate();
    },
    watch: {
        calculo: {
            handler: function() {
                this.calculate();
            },
            deep: true
        }
    },
    methods: {
        calculate() {
            const valorPedido = (this.calculo.valorCaixa * this.calculo.caixas) + this.calculo.valorEntrega;
            const pessoas =  this.calculo.pessoas - this.calculo.aniversariantes;
            this.resultado.valorIndividual = valorPedido / pessoas;

            const coxinhasPorCaixa = this.calculo.coxinhasPorCaixa * this.calculo.caixas
            this.resultado.coxinhasIndividual = coxinhasPorCaixa / this.calculo.pessoas;
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
