import { IonButton, IonCard, IonCardContent, IonInput } from '@ionic/react';
import { useRef, useState } from 'react';

const PoleCzworokata: React.FC = () => {
  const aRef = useRef<HTMLIonInputElement>(null);
  const bRef = useRef<HTMLIonInputElement>(null);
  const cRef = useRef<HTMLIonInputElement>(null);
  const dRef = useRef<HTMLIonInputElement>(null);
  const alfaRef = useRef<HTMLIonInputElement>(null);
  const gammaRef = useRef<HTMLIonInputElement>(null);
  const [wynik, setWynik] = useState('');

  const oblicz = () => {
    const a = Number(aRef.current?.value);
    const b = Number(bRef.current?.value);
    const c = Number(cRef.current?.value);
    const d = Number(dRef.current?.value);
    const alfa = Number(alfaRef.current?.value);
    const gamma = Number(gammaRef.current?.value);

    if ([a, b, c, d, alfa, gamma].some(liczba => !Number.isFinite(liczba) || liczba <= 0)) {
      setWynik('Wypełnij wszystkie pola.');
      return;
    }

    if (alfa >= 360 || gamma >= 360) {
      setWynik('Kąty muszą być większe niż 0° i mniejsze niż 360°.');
      return;
    }

    const s = (a + b + c + d) / 2;
    const kat = (alfa + gamma) / 2 * Math.PI / 180;
    const podPierwiastkiem = (s - a) * (s - b) * (s - c) * (s - d) - a * b * c * d * Math.cos(kat) ** 2;

    if (podPierwiastkiem <= 0) {
      setWynik('Czworokąt o podanych parametrach nie istnieje.');
      return;
    }

    setWynik(`Pole: ${Math.sqrt(podPierwiastkiem).toFixed(2).replace('.', ',')}`);
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonInput ref={aRef} type="number" label="Bok A" labelPlacement="stacked" />
        <IonInput ref={bRef} type="number" label="Bok B" labelPlacement="stacked" />
        <IonInput ref={cRef} type="number" label="Bok C" labelPlacement="stacked" />
        <IonInput ref={dRef} type="number" label="Bok D" labelPlacement="stacked" />
        <IonInput ref={alfaRef} type="number" label="Kąt α między A i D (°)" labelPlacement="stacked" />
        <IonInput ref={gammaRef} type="number" label="Kąt γ między B i C (°)" labelPlacement="stacked" />
        <IonButton onClick={oblicz}>Oblicz</IonButton>
        <p>{wynik}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default PoleCzworokata;

