const getPlaceholderProducts = () => {
  const products = [
    {
      IMDSC1: "COL. BANANA 113G",
      IMLITM: "15149"
    },
    {
      IMDSC1: "COL. FRUTAS MIXTA 113G",
      IMLITM: "15152"
    },
    {
      IMDSC1: "COL. FRUTAS TROPIC.113G",
      IMLITM: "15153"
    },
    {
      IMDSC1: "COL. POSTRE DE FRUTAS 113G",
      IMLITM: "15154"
    },
    {
      IMDSC1: "COL. MANZANA 113G",
      IMLITM: "15156"
    },
    {
      IMDSC1: "COL. PERA 113G",
      IMLITM: "15157"
    },
    {
      IMDSC1: "COL. MELOCOTON 113G",
      IMLITM: "15158"
    },
    {
      IMDSC1: "COL. CIRUELA PASAS 113G",
      IMLITM: "15159"
    },
    {
      IMDSC1: "COL. MANGO 113G",
      IMLITM: "15172"
    },
    {
      IMDSC1: "KETCHUP HEINZ 198G",
      IMLITM: "15196"
    },
    {
      IMDSC1: "KETCHUP HEINZ 397G",
      IMLITM: "15197"
    },
    {
      IMDSC1: "KETCHUP HEINZ 567G",
      IMLITM: "15198"
    },
    {
      IMDSC1: "KETCHUP TIQUIRE FLORES 198G",
      IMLITM: "15203"
    },
    {
      IMDSC1: "KETCHUP VOLPACK HEINZ",
      IMLITM: "15210"
    },
    {
      IMDSC1: "KETCHUP HEINZ INSTITUC. 397G",
      IMLITM: "15216"
    },
    {
      IMDSC1: "PURE DE TOMATE HEINZ 490G",
      IMLITM: "15217"
    },
    {
      IMDSC1: "PURE DE TOMATE HEINZ 190G",
      IMLITM: "15218"
    },
    {
      IMDSC1: "PASTA DE TOMATE HEINZ 200G",
      IMLITM: "15219"
    },
    {
      IMDSC1: "PASTA DE TOMATE HEINZ 511G",
      IMLITM: "15220"
    },
    {
      IMDSC1: "KETCHUP TQF 397G",
      IMLITM: "15228"
    },
    {
      IMDSC1: "PASTA TOMATE TQF 200G",
      IMLITM: "15229"
    },
    {
      IMDSC1: "PASTA TOMATE TQF 505G",
      IMLITM: "15230"
    },
    {
      IMDSC1: "PASTA AJO HEINZ 195G",
      IMLITM: "15231"
    },
    {
      IMDSC1: "SBT LA CUMBRE 380G",
      IMLITM: "15232"
    },
    {
      IMDSC1: "SPP BOLOGNESA VID195G",
      IMLITM: "15239"
    },
    {
      IMDSC1: "SPP BOLOGNESA VID 495G",
      IMLITM: "15240"
    },
    {
      IMDSC1: "SPP COMPLETA  VID 195G",
      IMLITM: "15243"
    },
    {
      IMDSC1: "SPP COMPLETA VID 495G",
      IMLITM: "15244"
    },
    {
      IMDSC1: "SPP NAPOLITANA VID 195G",
      IMLITM: "15245"
    },
    {
      IMDSC1: "SPP NAPOLITANA  VID 495G",
      IMLITM: "15246"
    },
    {
      IMDSC1: "SALSA PIZZA TRADICIONAL 480G",
      IMLITM: "15249"
    },
    {
      IMDSC1: "SPP SPAGH. CAMPESTRE  450G",
      IMLITM: "15250"
    },
    {
      IMDSC1: "SPP SPAGH. NAPOLITANO 480G",
      IMLITM: "15251"
    },
    {
      IMDSC1: "SPP SPAGH. PROVENZAL 465G",
      IMLITM: "15252"
    },
    {
      IMDSC1: "SALSA PRONTO BOLOGNESA 388G",
      IMLITM: "15253"
    },
    {
      IMDSC1: "SALSA PRONTO NAPOLITANA 388G",
      IMLITM: "15254"
    },
    {
      IMDSC1: "SALSA PRONTO COMPLETA 388G",
      IMLITM: "15255"
    },
    {
      IMDSC1: "MOSTAZA HEINZ VID 195G",
      IMLITM: "15258"
    },
    {
      IMDSC1: "MOSTAZA HEINZ VID 490G",
      IMLITM: "15260"
    },
    {
      IMDSC1: "MOSTAZA HEINZ  GALON 3820 G",
      IMLITM: "15261"
    },
    {
      IMDSC1: "MOSTAZA TQF VID 490G",
      IMLITM: "15265"
    },
    {
      IMDSC1: "SALSA 57 194G X 24UN",
      IMLITM: "15266"
    },
    {
      IMDSC1: "SALSA 57 378G",
      IMLITM: "15267"
    },
    {
      IMDSC1: "SALSA DE SOYA 150 CC",
      IMLITM: "15271"
    },
    {
      IMDSC1: "SALSA SOYA 300CC",
      IMLITM: "15272"
    },
    {
      IMDSC1: "SALSA SOYA LA CUMBRE 150 CC",
      IMLITM: "15274"
    },
    {
      IMDSC1: "SALSA SOYA TQF 150CC",
      IMLITM: "15275"
    },
    {
      IMDSC1: "SALSA SOYA TQF 300CC",
      IMLITM: "15276"
    },
    {
      IMDSC1: "VINAGRE GALON 4000 CC",
      IMLITM: "15278"
    },
    {
      IMDSC1: "SALSA INGLESA LA CUMBRE 150 CC",
      IMLITM: "15280"
    },
    {
      IMDSC1: "SALSA INGLESA 150 CC",
      IMLITM: "15281"
    },
    {
      IMDSC1: "SALSA INGLESA 300 CC",
      IMLITM: "15282"
    },
    {
      IMDSC1: "SALSA INGLESA GALON 4.000 CC",
      IMLITM: "15284"
    },
    {
      IMDSC1: "SALSA INGLESA TQF 150CC",
      IMLITM: "15286"
    },
    {
      IMDSC1: "SALSA INGLESA TQF 300CC",
      IMLITM: "15287"
    },
    {
      IMDSC1: "SALSA PICANTE 150 CC",
      IMLITM: "15288"
    },
    {
      IMDSC1: "VINAGRE BLANCO 500 CC",
      IMLITM: "15289"
    },
    {
      IMDSC1: "VINAGRE BLANCO 1000 CC",
      IMLITM: "15290"
    },
    {
      IMDSC1: "VINAGRE TQF 500 CC",
      IMLITM: "15292"
    },
    {
      IMDSC1: "VINAGRE TQF 1000 CC",
      IMLITM: "15293"
    },
    {
      IMDSC1: "SALSA AJO 150 CC",
      IMLITM: "15295"
    },
    {
      IMDSC1: "SALSA AJO 300 CC",
      IMLITM: "15296"
    },
    {
      IMDSC1: "SALSA AJO LA CUMBRE 150 CC",
      IMLITM: "15297"
    },
    {
      IMDSC1: "SALSA AJO TQF 150 CC",
      IMLITM: "15298"
    },
    {
      IMDSC1: "GEL. PIÑA 132G",
      IMLITM: "15320"
    },
    {
      IMDSC1: "GEL. TUTTI-FRUTTI 132G",
      IMLITM: "15321"
    },
    {
      IMDSC1: "GEL. LIMON 132G",
      IMLITM: "15322"
    },
    {
      IMDSC1: "GEL. CEREZA 132G",
      IMLITM: "15323"
    },
    {
      IMDSC1: "GEL. FRAMBUESA 132G",
      IMLITM: "15324"
    },
    {
      IMDSC1: "GEL. UVA 132G",
      IMLITM: "15326"
    },
    {
      IMDSC1: "GEL. FRESA 66G",
      IMLITM: "15329"
    },
    {
      IMDSC1: "GEL. FRESA 132G",
      IMLITM: "15330"
    },
    {
      IMDSC1: "GEL. UVA  66G",
      IMLITM: "15336"
    },
    {
      IMDSC1: "GEL. SIN SABOR 33G",
      IMLITM: "15338"
    },
    {
      IMDSC1: "GEL. CEREZA 66G",
      IMLITM: "15339"
    },
    {
      IMDSC1: "GEL. FRAMBUESA 66G",
      IMLITM: "15340"
    },
    {
      IMDSC1: "GEL. FRAMBUESA INST.1CJX3BL",
      IMLITM: "15342"
    },
    {
      IMDSC1: "PUDIN VAINILLA 58G",
      IMLITM: "15348"
    },
    {
      IMDSC1: "PUDIN CHOCOLATE 72G",
      IMLITM: "15352"
    },
    {
      IMDSC1: "FLAN 46G",
      IMLITM: "15353"
    },
    {
      IMDSC1: "FLAN 92G",
      IMLITM: "15355"
    },
    {
      IMDSC1: "POLLY BOLSA ENRIQ. 12X900G",
      IMLITM: "15372"
    },
    {
      IMDSC1: "CREMA A. POLLY ENR. 12X900G",
      IMLITM: "15374"
    },
    {
      IMDSC1: "POLLY BOLSA ENRIQ. 4X2000G",
      IMLITM: "15379"
    },
    {
      IMDSC1: "POLLY BOLSA ENRIQ. 12X450G",
      IMLITM: "15380"
    },
    {
      IMDSC1: "MI CHICHA POLLY 12X550G",
      IMLITM: "15381"
    },
    {
      IMDSC1: "SALSA TERIYAKI 150 CC",
      IMLITM: "15430"
    },
    {
      IMDSC1: "GEL. UVA INST. 1Cx3BL 3.874KG",
      IMLITM: "15437"
    },
    {
      IMDSC1: "KETCHUP HEINZ PICANTE 397G",
      IMLITM: "15553"
    },
    {
      IMDSC1: "COL. 100% MANZANA 110G",
      IMLITM: "15557"
    },
    {
      IMDSC1: "COL. 100% PERA 110G",
      IMLITM: "15558"
    },
    {
      IMDSC1: "COL. 100% MANZANA BANANA 110G",
      IMLITM: "15560"
    },
    {
      IMDSC1: "COL. 100% PERA GUAYABA 110G",
      IMLITM: "15561"
    },
    {
      IMDSC1: "SALS.EXTRA PICANTE HEINZ 150CC",
      IMLITM: "15566"
    },
    {
      IMDSC1: "MI CHICHA POLLY AREQ. 12X580G",
      IMLITM: "15567"
    },
    {
      IMDSC1: "MOSTAZA HEINZ 250G PET",
      IMLITM: "15582"
    },
    {
      IMDSC1: "MOSTAZA  MIEL HEINZ 280G PET",
      IMLITM: "15583"
    },
    {
      IMDSC1: "SALSA DE AJO GALON",
      IMLITM: "15588"
    },
    {
      IMDSC1: "MOSTAZA PICANTE HEINZ 265G PET",
      IMLITM: "15598"
    },
    {
      IMDSC1: "SALSA SOYA GALON 4000CC",
      IMLITM: "15610"
    },
    {
      IMDSC1: "COL. POUCH FRUT.MIXTAS 113G 24",
      IMLITM: "15645"
    },
    {
      IMDSC1: "COL. POUCH BANANA 113G 24UNDS",
      IMLITM: "15647"
    },
    {
      IMDSC1: "COL. POUCH F. TROPICAL 113G 24",
      IMLITM: "15671"
    },
    {
      IMDSC1: "COL. POUCH MELOCOTON 113G 24UN",
      IMLITM: "15672"
    },
    {
      IMDSC1: "COL. POUCH POST FRUTA 113G 24U",
      IMLITM: "15673"
    },
    {
      IMDSC1: "KET.IND. 10G 396 SB HEINZ",
      IMLITM: "15674"
    },
    {
      IMDSC1: "COL. POUCH PERA 113G 24UNDS",
      IMLITM: "15678"
    },
    {
      IMDSC1: "COL. POUCH MANZANA 113GR",
      IMLITM: "15679"
    },
    {
      IMDSC1: "MERE.CHOCO.KIDZ BOLS. 450G",
      IMLITM: "15704"
    },
    {
      IMDSC1: "SBT KETCHUP CON BBQ 397G",
      IMLITM: "15707"
    },
    {
      IMDSC1: "MOSTAZA HEINZ VID 113G",
      IMLITM: "15714"
    },
    {
      IMDSC1: "POSTRE MANZANA C/ARROZ 118G",
      IMLITM: "15723"
    },
    {
      IMDSC1: "POSTRE PERA C/ARROZ 118G",
      IMLITM: "15727"
    },
    {
      IMDSC1: "POST. FRUTAS TRO.C/ARROZ 118G",
      IMLITM: "15729"
    },
    {
      IMDSC1: "PASSATA HEINZ 480G",
      IMLITM: "15736"
    },
    {
      IMDSC1: "POST MANGO C/ARROZ 118G",
      IMLITM: "15737"
    },
    {
      IMDSC1: "KETCHUP HEINZ PROMOCION",
      IMLITM: "15739"
    },
    {
      IMDSC1: "GEL. TUTTI FRUTTI 66G",
      IMLITM: "15740"
    },
    {
      IMDSC1: "GEL. PIÑA  66G",
      IMLITM: "15752"
    },
    {
      IMDSC1: "SALSA PARA GUISO TQF 190G",
      IMLITM: "15753"
    },
    {
      IMDSC1: "SALSA PARA GUISOS TQF 480G",
      IMLITM: "15754"
    },
    {
      IMDSC1: "SALSA INGLESA  CUMBRE 4.000 CC",
      IMLITM: "15755"
    },
    {
      IMDSC1: "SALSA DE AJO CUMBRE 4000 CC",
      IMLITM: "15757"
    },
    {
      IMDSC1: "MI CHICHA POLLY BOLSA  12X450G",
      IMLITM: "15758"
    },
    {
      IMDSC1: "KETCHUP PICANTE 198G",
      IMLITM: "15759"
    },
    {
      IMDSC1: "COL. HEINZ PERA 186G",
      IMLITM: "15760"
    },
    {
      IMDSC1: "COL. HEINZ MANZANA 186G",
      IMLITM: "15761"
    },
    {
      IMDSC1: "COL. HEINZ MELOCOTON 186G",
      IMLITM: "15762"
    },
    {
      IMDSC1: "COL. HEINZ BANANA 186G",
      IMLITM: "15764"
    },
    {
      IMDSC1: "COL. HEINZ FRUTAS MIXTAS 186G",
      IMLITM: "15765"
    },
    {
      IMDSC1: "COL. HEINZ FRUTAS TROPIC 186G",
      IMLITM: "15766"
    },
    {
      IMDSC1: "KETCHUP BBK 198G",
      IMLITM: "15767"
    },
    {
      IMDSC1: "COL.POSTRE FRUTAS  186G",
      IMLITM: "15768"
    },
    {
      IMDSC1: "GEL. LIMÓN  66G",
      IMLITM: "15770"
    },
    {
      IMDSC1: "VINAGRE DORADO ARO 500 CC",
      IMLITM: "15771"
    },
    {
      IMDSC1: "GEL. CEREZA FLEXIBLE 132G",
      IMLITM: "15772"
    },
    {
      IMDSC1: "GEL. FRESA  FLEXIBLE 132G",
      IMLITM: "15773"
    },
    {
      IMDSC1: "GEL. FRAMBUESA FLEXIBLE 132G",
      IMLITM: "15774"
    },
    {
      IMDSC1: "KETCHUP HEINZ SIN AZÚCAR  367G",
      IMLITM: "15775"
    },
    {
      IMDSC1: "MOSTAZA MIEL VIDRIO 200G",
      IMLITM: "15777"
    },
    {
      IMDSC1: "KETCHUP TQF PROMO 397G",
      IMLITM: "15779"
    }
  ]
  return products;
}

export default getPlaceholderProducts;