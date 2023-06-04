import React, {useEffect} from 'react';
import CustomerGroupTable from './CustomerGroupTable';

function ListCustomerGroups() {
  const customerGroups = [
    {
      id: 0,
      name: 'Yetişkin',
      aciklama: 'Bu grup 18 yaş üstü',
    },
    {
      id: 1,
      name: 'Öğrenci',
      aciklama: 'Bu grup öğrencilere özel',
    },
    {
      id: 2,
      name: 'Emekli',
      aciklama: 'Bu grup emeklilere özel',
    },
  ];

  return <CustomerGroupTable customerGroups={customerGroups} />;
}

export default ListCustomerGroups;
