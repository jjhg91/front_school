import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _representativeList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import RepresentativeNewEditForm from '../../sections/@dashboard/representative/RepresentativeNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getRepresentative, updateRepresentative } from '../../redux/slices/representative';



// ----------------------------------------------------------------------

export default function RepresentativeEditPage() {

  const dispatch = useDispatch();

  const { representative, isLoading } = useSelector((state) => state.representative);

  const [currentRepresentative, setCurrentRepresentative] = useState(representative);

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  // const currentRepresentative = _representativeList.find((representative) => paramCase(representative.name) === name);

  
  useEffect(() => {
    dispatch(getRepresentative(name));
  }, [dispatch,name]);

  useEffect(() => {
    setCurrentRepresentative(representative);
  }, [representative]);
  

  return (
    <>
      <Helmet>
        <title> Representative: Edit representative | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit representative"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Representative',
              href: PATH_DASHBOARD.representative.list,
            },
            { name: `${currentRepresentative?.User?.first_name} ${currentRepresentative?.User?.first_surname}`},
          ]}
        />

        <RepresentativeNewEditForm isEdit currentRepresentative={currentRepresentative}  updateRepresentative={updateRepresentative} dispatch={dispatch}/>
      </Container>
    </>
  );
}
