import React from 'react';
import { FlagTwoTone } from '@ant-design/icons';

const fieldLabelConfig = {
  zotero_search: {
    label: 'Zotero',
    access: ['public', 'public', 'public']
  },
  zotero_id: {
    label: 'Imported Zotero Record',
    access: ['public', 'public', 'public']
  } ,
  title: {
    label: 'Title',
    access: ['public', 'public', 'public'],
  },
  item_type: {
    label: 'Item Type',
    access: ['public', 'public', 'public']
  },
  dates: {
    label: 'Date(s)',
    access: ['public', 'team', 'team']
  },
  abstract: {
    label: 'Document Abstract',
    access: ['public', 'team', 'private']
  },
  summary: {
    label: 'Overall Summary',
    access: ['public', 'team', 'private']
  },
  keywords: {
    label: 'Other keywords for document',
    access: ['public', 'team', 'private']
  },
  people: {
    label: 'People',
    access: ['public', 'team', 'team']
  },
  places: {
    label: 'Places',
    access: ['public', 'team', 'team']
  },
  organisations: {
    label: 'Organisations',
    access: ['public', 'team', 'team']
  },
  activist_repertoire: {
    label: 'Activist repertoire',
    access: ['public', 'team', 'team']
  },
  activist_repertoire_scale: {
    label: 'Scale of Repertoire Actions',
    access: ['public', 'team', 'team']
  },
  activist_repertoire_explanation: {
    label: 'Specific Factors/Events Triggering Repertoire Actions',
    access: ['team', 'team', 'team']
  },
  triggering_factor_keywords: {
    label: 'Free Keywords Relating to Triggering Factors/Events',
    access: ['public', 'team', 'team']
  },
  agendas: {
    label: 'Agendas',
    access: ['public', 'team', 'team']
  },
  agendas_explanation: {
    label: 'Further Explanation of Agendas',
    access: ['team', 'team', 'team']
  },
  effects_of_activism: {
    label: 'Actisivm effects',
    access: ['public', 'team', 'team']
  },
  effects_of_activism_explanation: {
    label: 'Further Explanation of Effects of Activism',
    access: ['team', 'team', 'team']
  },
  labour_relations: {
    label: 'Labour Relations',
    access: ['public', 'team', 'team']
  },
  labour_relations_explanation: {
    label: 'Further Explanation of Labour Relations',
    access: ['team', 'team', 'team']
  },
  labour_conditions: {
    label: 'Labour Conditions',
    access: ['public', 'team', 'team']
  },
  labour_conditions_explanation: {
    label: 'Further Explanation of Labour Conditions',
    access: ['team', 'team', 'team']
  },
  historical_context: {
    label: 'Historical Context',
    access: ['public', 'public', 'team']
  },
  historical_context_explanation: {
    label: 'Further Explanation of Historical Context',
    access: ['team', 'team', 'team']
  },
  activism_broad_patterns: {
    label: 'Broad Patterns of Activism and Non-Activism',
    access: ['team', 'team', 'team']
  },
  activism_broad_patterns_explanation: {
    label: 'Further Explanation of Pattern of (Non)Activism',
    access: ['team', 'team', 'team']
  },
  additional_research: {
    label: 'Additional research and interpretative notes/ideas',
    access: ['team', 'team', 'private']
  }
};

const getLabel = (field, formValues) => {
  const type = formValues['record_type'];

  const getIcon = (access) => {
    switch(access) {
      case 'public':
        return <FlagTwoTone twoToneColor={'#45a321'}/>;
      case 'team':
        return <FlagTwoTone twoToneColor={'#c8b800'}/>;
      case 'private':
        return <FlagTwoTone twoToneColor={'#ed4600'}/>;
      default:
        break;
    }
  };

  if (fieldLabelConfig.hasOwnProperty(field)) {
    const config = fieldLabelConfig[field];
    switch(type) {
      case 'default':
        return <span>{config['label']} {getIcon(config['access'][0])}</span>;
      case 'team':
        return <span>{config['label']} {getIcon(config['access'][1])}</span>;
      case 'individual':
        return <span>{config['label']} {getIcon(config['access'][2])}</span>;
      default:
        break;
    }
  } else {
    return ''
  }
};

export default getLabel;
