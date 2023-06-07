import React, {useEffect} from 'react';
import CallTable from './CallTable';

function PlannedForToday() {
  const customers = [
    {
      id: 0,
      name: 'John',
      surname: 'Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      agent: 'Burak Kaya',
      hotels: ['Cratos', 'Elexus'],
      group: 'Yetişkin',
      callHistory: [
        {
          date: new Date(2023, 11, 24),
          log: 'Cevap yok',
          hotel: 'Savoy',
          agent: 'Burak Kaya',
        },
        {
          date: new Date(2023, 11, 24),
          log: 'Gelmiyor',
          hotel: 'Savoy',
          agent: 'Burak Kaya',
        },
      ],
    },
    {
      id: 1,
      name: 'Jane',
      surname: 'Smith',
      phone: '9876543210',
      email: 'jane.smith@example.com',
      agent: 'Burak Kaya',
      hotels: ['Cratos', 'Elexus'],
      group: 'Yetişkin',
    },
    {
      id: 2,
      name: 'Michael',
      surname: 'Johnson',
      phone: '5555555555',
      email: 'michael.johnson@example.com',
      agent: 'Ferdi Caner',
      hotels: ['Artemis', 'Elexus'],
      group: 'Yetişkin',
    },
    {
      id: 3,
      name: 'Emily',
      surname: 'Williams',
      phone: '1111111111',
      email: 'emily.williams@example.com',
      agent: 'Ferdi Caner',
      hotels: ['Merit', 'Elexus'],
      group: 'Yetişkin',
    },
  ];
  return <CallTable customers={customers} />;
}

export default PlannedForToday;
