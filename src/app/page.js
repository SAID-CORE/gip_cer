'use client'
export default function Home() {
    function handleClick () {
        alert("Coddati")
    }
  return (
    <main className="flex min-h-screen flex-col">
      <div className={"bg-primary py-32 text-center flex flex-col items-center gap-2"}>
          <img src={"/assets/Delta_KiloWatt_logo.png"} className={"w-1/6"}/>
          <p className={"title text-white text-2xl px-12 mb-6"}>
              Avvia il simulatore per la valutazione economica delle Comunità di Energie Rinnovabili di Delta KiloWatt
          </p>
          <button className={"bg-secondary text-primary px-4 py-2"} onClick={handleClick}> Avvia ora</button>
      </div>
        <div className={"flex"} id={"simulator"}>
            <div className={"p-12 flex flex-col justify-start gap-8"}>
                <h5 className={"text-primary text-3xl font-semibold"}>IL SIMULATORE DELTA KILOWATT</h5>
                <p>
                    Il Simulatore per la valutazione economica delle Comunità di Energia Rinnovabile
                    è un&apos;applicazione web finalizzata a supportare valutazioni preliminari di tipo energetico,
                    economico e finanziario per la nascita di comunità energetiche rinnovabili (CER) o di gruppi di
                    autoconsumatori di energia rinnovabile che agiscono collettivamente (GAC) in base al quadro
                    legislativo e regolatorio in vigore in Italia. L&apos;applicazione può essere utilizzata
                    gratuitamente previa rilascio dati utili al calcolo.
                </p>
                <div>
                    <button className={"bg-secondary text-primary px-4 py-2"} onClick={handleClick}> Avvia ora</button>
                </div>
            </div>
            <div className={"w-full"}>
                <img src={"/assets/Img_LandingPage_1.png"} className={"w-full"}/>
            </div>


        </div>
        <div className={"bg-green-custom flex flex-col justify-between items-center text-white p-12 gap-10"}>
            <h5 className={"text-3xl font-semibold"}> IL RISULTATO DELLA SIMULAZIONE</h5>
            <p>A seconda del volume di persone che aderiranno alla Comunità di Energia Rinnovabile</p>
            <div className={"flex w-8/12 justify-center gap-10"}>
                <div className={"border border-white p-4"}>
                    Investimento necessario
                </div>
                <div className={"border border-white p-4"}>
                    Rata di accredito
                </div>
                <div className={"border border-white p-4"}>
                    Anni di rientro nell&apos;investimento
                </div>
                <div className={"border border-white p-4"}>
                    Totale di accredito in 20 anni
                </div>
            </div>
            <button className={"bg-secondary text-primary px-4 py-2"} onClick={handleClick}> Avvia ora</button>

        </div>
        <div className={"p-12 flex flex-col items-center"}>
            <h5>L&apos;ATTUALE ANDAMENTO DELLO SVILUPPO DELLE COMUNITÀ DI ENERGIA IN SARDEGNA</h5>
            <select>
            <option value={"ciao"}>
                ciao
            </option>
            </select>
            <img src={"/assets/Img_LandingPage_2.png"} className={"w-1/4 my-24"}/>

        {/* INIZIO TABELLA */}
            <table >
                <thead>
                <tr>
                    <th colSpan={2} className={"bg-primary text-white"}>Masullas (Oristano)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>N° totale aderenti</td>
                    <td>151</td>
                </tr>
                <tr>
                    <td>N° totale Consumatori</td>
                    <td>82</td>
                </tr>
                <tr>
                    <td>N° totale Produttori</td>
                    <td>58</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan={2} className={"bg-secondary text-primary text-sm font-light"} onClick={handleClick}>Avvia la simulazione, unisciti alla CER del tuo comune</th>
                </tr>
                </tfoot>
            </table>
        {/* FINE TABELLA*/}
        </div>
    </main>
  );
}
