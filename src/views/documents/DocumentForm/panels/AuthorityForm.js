import React from "react";
import {Col, Row} from "antd";
import SelectWithExtraOption from "../../../../components/FormComponents/SelectWithExtraOption/SelectWithExtraOption";
import person from '../../../../services/person';
import place from '../../../../services/place';
import organisation from '../../../../services/organisation';
import event from '../../../../services/event';
import getLabel from "../../../../utils/getLabel";

const AuthorityForm = ({values, action, ...props}) => {
  return (
    <Row gutter={10}>
      <Col span={24}>
        <SelectWithExtraOption
          formAction={action}
          field={'events'}
          label={getLabel('events', values)}
          valueField={'id'}
          labelField={'event_full'}
          recordName={'event'}
          placeholder={'- Select event -'}
          serviceClass={event}
          color={'error'}
        />
      </Col>
      <Col span={24}>
        <SelectWithExtraOption
          formAction={action}
          field={'people'}
          label={getLabel('people', values)}
          valueField={'id'}
          labelField={'full_name'}
          recordName={'person'}
          placeholder={'- Select person -'}
          serviceClass={person}
          color={'blue'}
        />
      </Col>
      <Col span={24}>
        <SelectWithExtraOption
          formAction={action}
          field={'places'}
          label={getLabel('places', values)}
          valueField={'id'}
          labelField={'place_name'}
          recordName={'place'}
          placeholder={'- Select place -'}
          serviceClass={place}
          color={'green'}
        />
      </Col>
      <Col span={24}>
        <SelectWithExtraOption
          formAction={action}
          field={'organisations'}
          label={getLabel('organisations', values)}
          valueField={'id'}
          labelField={'full_name'}
          recordName={'organisation'}
          placeholder={'- Select organisation -'}
          serviceClass={organisation}
          color={'warning'}
        />
      </Col>
    </Row>
  )
};

export default AuthorityForm;
