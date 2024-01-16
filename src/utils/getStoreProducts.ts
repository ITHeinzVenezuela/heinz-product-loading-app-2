const getStoreProducts = () => {

  type StoreProducts = {
    STOCKCOD: string;
    MCCO: string;
    LIMCU: string;
    IMLITM: string;
    STOCKCANT: number;
  }

  const products = [
    {
      STOCKCOD: '15773',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15773',
      STOCKCANT: 4
    },
    {
      STOCKCOD: '15217',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15217',
      STOCKCANT: 3
    },
    {
      STOCKCOD: '15196',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15196',
      STOCKCANT: 21
    },
    {
      STOCKCOD: '15158',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15158',
      STOCKCANT: 25
    },
    {
      STOCKCOD: '15197',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15197',
      STOCKCANT: 572
    },
    {
      STOCKCOD: '15298',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15298',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15297',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15297',
      STOCKCANT: 98
    },
    {
      STOCKCOD: '15282',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15282',
      STOCKCANT: 27
    },
    {
      STOCKCOD: '15286',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15286',
      STOCKCANT: 22
    },
    {
      STOCKCOD: '15707',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15707',
      STOCKCANT: 6
    },
    {
      STOCKCOD: '15253',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15253',
      STOCKCANT: 71
    },
    {
      STOCKCOD: '15760',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15760',
      STOCKCANT: 29
    },
    {
      STOCKCOD: '15765',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15765',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15764',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15764',
      STOCKCANT: 3
    },
    {
      STOCKCOD: '15149',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15149',
      STOCKCANT: 239
    },
    {
      STOCKCOD: '15355',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15355',
      STOCKCANT: 2
    },
    {
      STOCKCOD: '15740',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15740',
      STOCKCANT: 11
    },
    {
      STOCKCOD: '15329',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15329',
      STOCKCANT: 42
    },
    {
      STOCKCOD: '15566',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15566',
      STOCKCANT: 6
    },
    {
      STOCKCOD: '15704',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15704',
      STOCKCANT: 39
    },
    {
      STOCKCOD: '15243',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15243',
      STOCKCANT: 53
    },
    {
      STOCKCOD: '15561',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15561',
      STOCKCANT: 2
    },
    {
      STOCKCOD: '15758',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15758',
      STOCKCANT: 4
    },
    {
      STOCKCOD: '15290',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15290',
      STOCKCANT: 63
    },
    {
      STOCKCOD: '15219',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15219',
      STOCKCANT: 9
    },
    {
      STOCKCOD: '15153',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15153',
      STOCKCANT: 24
    },
    {
      STOCKCOD: '15292',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15292',
      STOCKCANT: 21
    },
    {
      STOCKCOD: '15768',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15768',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15244',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15244',
      STOCKCANT: 4
    },
    {
      STOCKCOD: '15230',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15230',
      STOCKCANT: 10
    },
    {
      STOCKCOD: '15322',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15322',
      STOCKCANT: 3
    },
    {
      STOCKCOD: '15218',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15218',
      STOCKCANT: 13
    },
    {
      STOCKCOD: '15228',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15228',
      STOCKCANT: 9
    },
    {
      STOCKCOD: '15736',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15736',
      STOCKCANT: 181
    },
    {
      STOCKCOD: '15645',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15645',
      STOCKCANT: 2
    },
    {
      STOCKCOD: '15272',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15272',
      STOCKCANT: 18
    },
    {
      STOCKCOD: '15275',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15275',
      STOCKCANT: 17
    },
    {
      STOCKCOD: '15232',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15232',
      STOCKCANT: 0
    },
    {
      STOCKCOD: '15287',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15287',
      STOCKCANT: 65
    },
    {
      STOCKCOD: '15203',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15203',
      STOCKCANT: 4
    },
    {
      STOCKCOD: '15766',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15766',
      STOCKCANT: 2
    },
    {
      STOCKCOD: '15775',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15775',
      STOCKCANT: 3
    },
    {
      STOCKCOD: '15266',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15266',
      STOCKCANT: 9
    },
    {
      STOCKCOD: '15679',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15679',
      STOCKCANT: 88
    },
    {
      STOCKCOD: '15771',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15771',
      STOCKCANT: 23
    },
    {
      STOCKCOD: '15157',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15157',
      STOCKCANT: 115
    },
    {
      STOCKCOD: '15761',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15761',
      STOCKCANT: 2
    },
    {
      STOCKCOD: '15338',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15338',
      STOCKCANT: 5
    },
    {
      STOCKCOD: '15340',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15340',
      STOCKCANT: 28
    },
    {
      STOCKCOD: '15239',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15239',
      STOCKCANT: 0
    },
    {
      STOCKCOD: '15352',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15352',
      STOCKCANT: 17
    },
    {
      STOCKCOD: '15288',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15288',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15353',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15353',
      STOCKCANT: 15
    },
    {
      STOCKCOD: '15276',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15276',
      STOCKCANT: 45
    },
    {
      STOCKCOD: '15156',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15156',
      STOCKCANT: 78
    },
    {
      STOCKCOD: '15220',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15220',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15714',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15714',
      STOCKCANT: 36
    },
    {
      STOCKCOD: '15280',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15280',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15271',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15271',
      STOCKCANT: 18
    },
    {
      STOCKCOD: '15229',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15229',
      STOCKCANT: 50
    },
    {
      STOCKCOD: '15154',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15154',
      STOCKCANT: 10
    },
    {
      STOCKCOD: '15289',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15289',
      STOCKCANT: 6
    },
    {
      STOCKCOD: '15772',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15772',
      STOCKCANT: 2
    },
    {
      STOCKCOD: '15246',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15246',
      STOCKCANT: 33
    },
    {
      STOCKCOD: '15430',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15430',
      STOCKCANT: 2
    },
    {
      STOCKCOD: '15321',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15321',
      STOCKCANT: 11
    },
    {
      STOCKCOD: '15339',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15339',
      STOCKCANT: 16
    },
    {
      STOCKCOD: '15260',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15260',
      STOCKCANT: 11
    },
    {
      STOCKCOD: '15231',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15231',
      STOCKCANT: 2
    },
    {
      STOCKCOD: '15678',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15678',
      STOCKCANT: 11
    },
    {
      STOCKCOD: '15348',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15348',
      STOCKCANT: 47
    },
    {
      STOCKCOD: '15770',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15770',
      STOCKCANT: 12
    },
    {
      STOCKCOD: '15295',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15295',
      STOCKCANT: 10
    },
    {
      STOCKCOD: '15336',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15336',
      STOCKCANT: 45
    },
    {
      STOCKCOD: '15320',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15320',
      STOCKCANT: 3
    },
    {
      STOCKCOD: '15267',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15267',
      STOCKCANT: 29
    },
    {
      STOCKCOD: '15752',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15752',
      STOCKCANT: 3
    },
    {
      STOCKCOD: '15296',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15296',
      STOCKCANT: 39
    },
    {
      STOCKCOD: '15557',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15557',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15671',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15671',
      STOCKCANT: 118
    },
    {
      STOCKCOD: '15553',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15553',
      STOCKCANT: 8
    },
    {
      STOCKCOD: '15774',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15774',
      STOCKCANT: 37
    },
    {
      STOCKCOD: '15240',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15240',
      STOCKCANT: 16
    },
    {
      STOCKCOD: '15779',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15779',
      STOCKCANT: 5
    },
    {
      STOCKCOD: '15249',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15249',
      STOCKCANT: 64
    },
    {
      STOCKCOD: '15258',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15258',
      STOCKCANT: 27
    },
    {
      STOCKCOD: '15558',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15558',
      STOCKCANT: 3
    },
    {
      STOCKCOD: '15326',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15326',
      STOCKCANT: 11
    },
    {
      STOCKCOD: '15293',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15293',
      STOCKCANT: 16
    },
    {
      STOCKCOD: '15281',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15281',
      STOCKCANT: 12
    },
    {
      STOCKCOD: '15672',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15672',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15777',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15777',
      STOCKCANT: 6
    },
    {
      STOCKCOD: '15245',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15245',
      STOCKCANT: 1
    },
    {
      STOCKCOD: '15762',
      MCCO: '07200',
      LIMCU: 'VE03',
      IMLITM: '15762',
      STOCKCANT: 1
    }
  ]
}