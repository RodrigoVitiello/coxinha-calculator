<template>
    <div class="wrapper">
        <div class="calculo">
            <div class="input-group">
                <label for="pessoas">Quantidade de Pessoas</label>
                <input
                    id="pessoas"
                    type="tel"
                    placeholder="Pessoas"
                    v-mask="'###'"
                    v-model.number="calculo.pessoas" />
            </div>

            <div class="input-group">
                <label for="aniversariantes">Quantidade de Aniversariantes</label>
                <input
                    id="aniversariantes"
                    type="tel"
                    placeholder="Aniversariantes"
                    v-mask="'###'"
                    v-model.number="calculo.aniversariantes" />
            </div>

            <div class="input-group">
                <label for="caixas">Quantidade de Caixas</label>
                <input
                    id="caixas"
                    type="tel"
                    placeholder="Caixas"
                    v-mask="'###'"
                    v-model.number="calculo.caixas" />
            </div>

            <div class="input-group">
                <label for="quantidade-por-caixa">Quantidade por Caixa</label>
                <input
                    id="quantidade-por-caixa"
                    type="tel"
                    placeholder="Quantidade por caixa"
                    v-mask="'###'"
                    v-model.number="calculo.coxinhasPorCaixa" />
            </div>

            <div class="input-group">
                <label for="valor-caixa">Valor da Caixa</label>
                <money
                    id="valor-caixa"
                    v-model.number="calculo.valorCaixa"
                    v-bind="moneyCfg" />
            </div>

            <div class="input-group">
                <label for="valor-entrega">Valor da Entrega</label>
                <money
                    id="valor-entrega"
                    v-model.number="calculo.valorEntrega"
                    v-bind="moneyCfg" />
            </div>
        </div>

        <div class="resultado">
            <h2>Resultado</h2>
            <div class="text-group">
                Valor por pessoa:
                <span v-if="isFinite(this.resultado.valorIndividual)">{{ valorIndividual }}</span>
              <span v-else>--</span>
            </div>
            <div class="text-group">
                Coxinhas por pessoa:
                <span v-if="isFinite(this.resultado.coxinhasIndividual)">{{ this.resultado.coxinhasIndividual }}</span>
                <span v-else>--</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Money } from 'v-money';
import { mask } from 'vue-the-mask';

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
            },
            moneyCfg: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            }
        };
    },
    created () {
        this.calculate();
    },
    computed: {
        valorIndividual: function () {
            return this.toMoney(this.resultado.valorIndividual);
        }
    },
    watch: {
        calculo: {
            handler: function () {
                this.calculate();
            },
            deep: true
        }
    },
    methods: {
        calculate () {
            const valorPedido = (this.calculo.valorCaixa * this.calculo.caixas) + this.calculo.valorEntrega;
            const pessoas = this.calculo.pessoas - this.calculo.aniversariantes;
            this.resultado.valorIndividual = valorPedido / pessoas;

            const coxinhasPorCaixa = this.calculo.coxinhasPorCaixa * this.calculo.caixas;
            this.resultado.coxinhasIndividual = coxinhasPorCaixa / this.calculo.pessoas;
        },
        toMoney (money) {
            return ("R$ " + parseFloat(money).toFixed(2))
                        .replace(".", ",")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        }
    },
    components: {
        Money
    },
    directives: {
        mask
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    font-size: 30px;
}

.wrapper {
    margin: auto;
    width: 50%;
}
.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    text-align: left;
    font-size: small;
}

.input-group input {
    padding: 10px 0;
    border-radius: 3px;
    width: 100%;
    border-style: groove;
    display: inline;
    text-align: center;
    font-size: 20px;
}

.resultado {
    margin: 60px 0;
}
.text-group {
    margin-bottom: 15px;
    font-size: 25px;
}
.text-group span {
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
