import { NextApiRequest, NextApiResponse } from "next"
import sequelize from "@/lib/mssql"

const Prueba = async (request: NextApiRequest, response: NextApiResponse) => {
  // const queryString = `select * from OPENQUERY(JDE, 'SELECT * FROM PRODDTA.f4001z ORDER BY SYEDOC DESC') -- Cabecera`
  const queryString = `select SZEKCO, SZKCOO, SZEDOC, SZDOCO, SZEDLN, SZLNID, SZMCU, SZAN8, SZSHAN, SZITM, SZLITM, SZAITM, SZDSC1, SZDSC2, SZDRQJ, SZTRDJ, SZRSDJ, SZPEFJ, SZUPMJ, SZPDDJ, SZNXTR, SZLTTR, SZCTRY, SZUORG, SZSOQS, SZUPRC, SZAEXP, SZUNCS, SZECST, SZITWT, SZTDAY, SZSLSM, SZSLM2, SZUOM, SZPTC, SZPRIO, SZSTOP, SZZON, SZRATT, SZWTUM, SZLT, SZASN, SZTORG, SZUSER, SZPID, SZJOBN, SZPROV, SZCSTO, SZCMGL, SZLNTY, SZCOMM, SZSTTS, SZEDCT, SZDCTO, SZBALU, SZUNCD, SZEDSP, SZTAX1, SZBACK, SZSBAL, SZAPTS, SZAFT, SZFUF1, SZSO03, SZACOM, SZEDTY, SZEDST, SZEDFT, SZEDER, SZPNID, SZSFXO, SZCO, SZOKCO, SZOORN, SZOCTO, SZRKCO, SZRORN, SZRCTO, SZDMCT, SZVR01, SZVR02, SZLOCN, SZLOTN, SZFRGD, SZTHGD, SZEMCU, SZRLIT, SZSRP1, SZSRP2, SZSRP3, SZSRP4, SZSRP5, SZPRP1, SZPRP2, SZPRP3, SZPRP4, SZPRP5, SZPRGR, SZCLVL, SZDSFT, SZFAPP, SZKCO, SZDCT, SZODCT, SZOKC, SZPRMO, SZTXA1, SZEXR1, SZATXT, SZRESL, SZOTQY, SZTPC, SZAPUM, SZINMG, SZRYIN, SZDTBS, SZCNID, SZFRTH, SZLOB, SZEUSE, SZDTYS, SZCDCD, SZNTR, SZMOT, SZCOT, SZROUT, SZFRTC, SZFRAT, SZSHCM, SZSHCN, SZSERN, SZUOM1, SZUOM2, SZUOM4, SZVLUM, SZRPRC, SZORPR, SZORP, SZCMGP, SZGLC, SZSO01, SZSO02, SZSO04, SZSO05, SZSO06, SZSO07, SZSO08, SZSO09, SZSO10, SZSO11, SZSO12, SZSO13, SZSO14, SZSO15, SZCMCG, SZRCD, SZGWUM, SZANI, SZAID, SZOMCU, SZOBJ, SZSUB, SZSBL, SZSBLT, SZLCOD, SZUPC1, SZUPC2, SZUPC3, SZSWMS, SZCRMD, SZCRCD, SZURCD, SZURRF, SZEDSQ, SZEDDT, SZEDDL, SZOGNO, SZRLLN, SZDMCS, SZPA8, SZOPDJ, SZADDJ, SZIVD, SZCNDJ, SZDGL, SZPPDJ, SZPSDJ, SZFRMP, SZTHRP, SZEXDP, SZKTLN, SZCPNT, SZRKIT, SZKTP, SZSOBK, SZSOCN, SZSONE, SZUOPN, SZQTYT, SZQRLV, SZAOPN, SZLPRC, SZTCST, SZTRDC, SZFUN2, SZDSPR, SZCADC, SZDOC, SZODOC, SZPSN, SZDELN, SZDFTN, SZVEND, SZANBY, SZCARS, SZPQOR, SZSQOR, SZITVL, SZFY, SZSLCM, SZSLC2, SZGRWT, SZCRR, SZFPRC, SZFUP, SZFEA, SZFUC, SZFEC, SZURDT, SZURAT, SZURAB from OPENQUERY(JDE, 'SELECT * FROM PRODDTA.f4011z where SZLITM = ''15775'' and SZEDOC = 5670644  ORDER BY SZEDOC DESC') -- Detalle` // -> Time of Day

  const [data] = await sequelize.query(queryString) as [unknown[], unknown]
  response.status(200).json(data)
}

export default Prueba;

// Nelson
// Vivianne Font

const cabecera = {
  "SYEDOC": 5670644, // N° Orden
  "SYDOCO": 5670644, // N° Orden
  "SYDEL1": "Empleados Barquisimeto", // Observaciones
  "SYMCU": "        VE04", // Almacén
  "SYVR01": "54-18102023", // Orden de compra
  "SYAN8": 1002480,        // FICHA DE EMPLEADO
  "SYSHAN": 1002480,       // FICHA DE EMPLEADO
  "SYDRQJ": 123296,        // Fecha 5 dias despues (Fecha de entrega) -> Date - Requested
  "SYTRDJ": 123291,        // Fecha Real -> Date - Order/Transaction
  "SYURDT": 123291,        // FECHA
  "SYUPMJ": 123291,        // FECHA
  "SYTDAY": 121854,        // -> Time of Day
  "SYCO": "07200",
  "SYEKCO": "07200",
  "SYKCOO": "07200",
  "SYEDCT": "BV",
  "SYDCTO": "BV",
  "SYEDER": "B",
  "SYURRF": "iWEB",
  "SYUSER": "VSJIT15",
  "SYJOBN": "HVEOW001",
  "SYPTC": "",
  "SYSUN": "",
  "SYMON": "",
  "SYTUE": "",
  "SYWED": "",
  "SYTHR": "",
  "SYFRI": "",
  "SYSAT": "",
  "SYASN": "",
  "SYNTR": "",
  "SYEDTY": "",
  "SYEDST": "",
  "SYEDFT": "",
  "SYEDSP": "", // "Y" -> Ya procesado
  "SYPNID": "",
  "SYOFRQ": "",
  "SYSFXO": "",
  "SYOKCO": "",
  "SYOORN": "",
  "SYOCTO": "",
  "SYRKCO": "",
  "SYRORN": "",
  "SYRCTO": "",
  "SYVR02": "",
  "SYDEL2": "",
  "SYINMG": "",
  "SYRYIN": "",
  "SYPRGP": "",
  "SYTXA1": "",
  "SYEXR1": "",
  "SYTXCT": "",
  "SYATXT": "",
  "SYBACK": "",
  "SYSBAL": "",
  "SYHOLD": "",
  "SYPLST": "",
  "SYMOT": "",
  "SYCOT": "",
  "SYZON": "",
  "SYAFT": "",
  "SYRCD": "",
  "SYPID": "",
  "SYROUT": "",
  "SYCNID": "",
  "SYFRTH": "",
  "SYSTOP": "",
  "SYFUF1": "",
  "SYFRTC": "",
  "SYMORD": "",
  "SYFUF2": "",
  "SYWUMD": "",
  "SYVUMD": "",
  "SYAUTN": "",
  "SYCACT": "",
  "SYSBLI": "",
  "SYCRMD": "",
  "SYCRRM": "",
  "SYCRCD": "",
  "SYLNGP": "",
  "SYORBY": "",
  "SYTKBY": "",
  "SYURCD": "",
  "SYPRIO": "0",
  "SYCRR": 0,
  "SYFAP": 0,
  "SYPA8": 0,
  "SYEDSQ": 0,
  "SYEDLN": 0,
  "SYEDDT": 0,
  "SYEDDL": 0,
  "SYNXDJ": 0,
  "SYSSDJ": 0,
  "SYPDDJ": 0,
  "SYOPDJ": 0,
  "SYADDJ": 0,
  "SYCNDJ": 0,
  "SYPEFJ": 0,
  "SYPPDJ": 0,
  "SYPSDJ": 0,
  "SYTRDC": 0,
  "SYPCRT": 0,
  "SYINVC": 0,
  "SYANBY": 0,
  "SYCARS": 0,
  "SYCMC1": 0,
  "SYCMR1": 0,
  "SYCMC2": 0,
  "SYCMR2": 0,
  "SYOTOT": 0,
  "SYTOTC": 0,
  "SYCEXP": 0,
  "SYFCST": 0,
  "SYURAT": 0,
  "SYURAB": 0,
}

const data = {
  "SZEDOC": 5670644, // Numero Orden
  "SZDOCO": 5670644, // Numero Orden
  "SZLITM": "15775", // SKU
  "SZDSC1": "", // Nombre
  "SZDSC2": "", // Nombre
  "SZVR01": "54-18102023", // Descripcion boletin
  "SZUORG": 5000,    // Cajas / 10000 ->	Units - Order/Transaction Quantity
  "SZSOQS": 5000,    // -> Quantity Shipped
  "SZMCU": "        VE04", // "        VE03"
  "SZAN8": 1002480,  // FICHA DE EMPLEADO
  "SZSHAN": 1002480, // FICHA DE EMPLEADO
  "SZITM": 0, //IMITM
  "SZPDDJ": 0,
  "SZCTRY": 0,
  "SZEKCO": "07200",
  "SZKCOO": "07200",
  "SZEDLN": 25000,  // Numero de linea
  "SZLNID": 25000,  // Numero de linea
  "SZDRQJ": 123296, // Fecha 5 dias despues (Fecha de entrega) -> Date - Requested
  "SZTRDJ": 123291, // Fecha Real -> Date - Order/Transaction
  "SZRSDJ": 0, // Fecha -> Date - Promised Delivery
  "SZPEFJ": 0, // Fecha -> Date - Price Effective Date
  "SZUPMJ": 123291, // Fecha de actualización
  "SZNXTR": "580", // Tiene que ser "524"
  "SZLTTR": "520", // Valor estático
  "SZUPRC": 0,       // -> Amount - Price per Unit
  "SZAEXP": 0,       // -> EXP	Amount - Extended Price
  "SZUNCS": 0,       // -> Amount - Unit Cost
  "SZECST": 0,       // -> Amount - Extended Cost
  "SZITWT": 0,       // -> Unit Weight	
  "SZTDAY": 121854,  // -> Time of Day	 // -> Time of Day
  "SZURDT": 123291, // User Reserved Date
  "SZSLSM": 0,
  "SZSLM2": 0,
  "SZUOM": "CJ",     // IMUOM1 -> Unit of Measure as Input
  "SZPTC": "",       // Payment Terms Code
  "SZPRIO": "0",     // Valor estático
  "SZUSER": "VSJIT15",  // IMUSER
  "SZJOBN": "HVEOW001", // IMJOBN
  "SZLNTY": "S", //IBLNTY
  "SZCOMM": "S",
  "SZEDCT": "BV",
  "SZDCTO": "BV", // Tiene que ser siempre "V1"
  "SZBALU": "N",
  "SZEDER": "B",
  "SZCO": "07200",
  "SZURRF": "iWEB",
  
  "SZAITM": "", // SKU
  "SZSTOP": "",
  "SZZON": "",
  "SZRATT": "",
  "SZWTUM": "",         // IMUWUM
  "SZLT": "",
  "SZASN": "",
  "SZTORG": "",
  "SZPID": "",     // IMPID
  "SZPROV": "",
  "SZCSTO": "",
  "SZCMGL": "",
  "SZSTTS": "",
  "SZUNCD": "",
  "SZEDSP": "", // "Y" -> Ya trasferido
  "SZTAX1": "",
  "SZBACK": "", //IBBACK
  "SZSBAL": "",
  "SZAPTS": "",
  "SZAFT": "",
  "SZFUF1": "",
  "SZSO03": "",
  "SZACOM": "",
  "SZEDTY": "",
  "SZEDST": "",
  "SZEDFT": "",
  "SZPNID": "",
  "SZSFXO": "",
  "SZOKCO": "",
  "SZOORN": "",
  "SZOCTO": "",
  "SZRKCO": "",
  "SZRORN": "",
  "SZRCTO": "",
  "SZDMCT": "",
  "SZVR02": "",
  "SZLOCN": "",
  "SZLOTN": "",
  "SZFRGD": "",
  "SZTHGD": "",
  "SZEMCU": "",
  "SZRLIT": "",
  "SZSRP1": "",
  "SZSRP2": "",
  "SZSRP3": "",
  "SZSRP4": "",
  "SZSRP5": "",
  "SZPRP1": "",
  "SZPRP2": "",
  "SZPRP3": "",
  "SZPRP4": "",
  "SZPRP5": "",
  "SZPRGR": "",
  "SZCLVL": "",
  "SZDSFT": "",
  "SZFAPP": "",
  "SZKCO": "",
  "SZDCT": "",
  "SZODCT": "",
  "SZOKC": "",
  "SZPRMO": "",
  "SZTXA1": "",
  "SZEXR1": "",
  "SZATXT": "",
  "SZRESL": "",
  "SZOTQY": "",
  "SZTPC": "",
  "SZAPUM": "",
  "SZINMG": "", // IBINMG
  "SZRYIN": "",
  "SZDTBS": "",
  "SZCNID": "",
  "SZFRTH": "",
  "SZLOB": "",
  "SZEUSE": "",
  "SZDTYS": "",
  "SZCDCD": "",
  "SZNTR": "",
  "SZMOT": "",
  "SZCOT": "",
  "SZROUT": "",
  "SZFRTC": "",
  "SZFRAT": "",
  "SZSHCM": "",
  "SZSHCN": "",
  "SZSERN": "",
  "SZUOM1": "",
  "SZUOM2": "",
  "SZUOM4": "",
  "SZVLUM": "",
  "SZRPRC": "", // IBRPRC
  "SZORPR": "", // IBORPR
  "SZORP": "",
  "SZCMGP": "",
  "SZGLC": "",
  "SZSO01": "",
  "SZSO02": "",
  "SZSO04": "",
  "SZSO05": "",
  "SZSO06": "",
  "SZSO07": "",
  "SZSO08": "",
  "SZSO09": "",
  "SZSO10": "",
  "SZSO11": "",
  "SZSO12": "",
  "SZSO13": "",
  "SZSO14": "",
  "SZSO15": "",
  "SZCMCG": "", // IBCMCG
  "SZRCD": "",
  "SZGWUM": "",
  "SZANI": "",
  "SZAID": "",
  "SZOMCU": "",
  "SZOBJ": "",
  "SZSUB": "",
  "SZSBL": "",
  "SZSBLT": "",
  "SZLCOD": "",
  "SZUPC1": "",
  "SZUPC2": "",
  "SZUPC3": "",
  "SZSWMS": "",
  "SZCRMD": "",
  "SZCRCD": "",
  "SZURCD": "", // IMURCD
  "SZEDSQ": 0,
  "SZEDDT": 0,
  "SZEDDL": 0,
  "SZOGNO": 0,
  "SZRLLN": 0,
  "SZDMCS": 0,
  "SZPA8": 0,
  "SZOPDJ": 0,
  "SZADDJ": 0,
  "SZIVD": 0,
  "SZCNDJ": 0,
  "SZDGL": 0,
  "SZPPDJ": 0,
  "SZPSDJ": 0,
  "SZFRMP": 0, // IBFRMP
  "SZTHRP": 0, // IBTHRP
  "SZEXDP": 0,
  "SZKTLN": 0,
  "SZCPNT": 0,
  "SZRKIT": 0,
  "SZKTP": 0,
  "SZSOBK": 0,
  "SZSOCN": 0,
  "SZSONE": 0,
  "SZUOPN": 0,
  "SZQTYT": 0,
  "SZQRLV": 0,
  "SZAOPN": 0,
  "SZLPRC": 0,
  "SZTCST": 0,
  "SZTRDC": 0,
  "SZFUN2": 0,
  "SZDSPR": 0,
  "SZCADC": 0,
  "SZDOC": 0,
  "SZODOC": 0,
  "SZPSN": 0,
  "SZDELN": 0,
  "SZDFTN": 0,
  "SZVEND": 0, // IBVEND
  "SZANBY": 0,
  "SZCARS": 0,
  "SZPQOR": 0,
  "SZSQOR": 0,
  "SZITVL": 0,
  "SZFY": 0,
  "SZSLCM": 0,
  "SZSLC2": 0,
  "SZGRWT": 0,
  "SZCRR": 0.0000000,
  "SZFPRC": 0,
  "SZFUP": 0,
  "SZFEA": 0,
  "SZFUC": 0,
  "SZFEC": 0,
  "SZURAT": 0, // IMURAT
  "SZURAB": 0, // IMURAB
}