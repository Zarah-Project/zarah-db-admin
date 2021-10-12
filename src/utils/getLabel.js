import React from 'react';
import { FlagTwoTone } from '@ant-design/icons';

const fieldLabelConfig = {
  zotero_search: {
    label: 'Zotero',
    access: ['public', 'public', 'public']
  },
  zotero_id: {
    label: 'Imported Zotero record',
    access: ['public', 'public', 'public']
  },
  zotero_language: {
    label: 'Language (Zotero)',
    access: ['public', 'public', 'public']
  },
  zotero_author: {
    label: 'Author (Zotero)',
    access: ['public', 'public', 'public']
  },
  zotero_publication_title: {
    label: 'Publication Title (Zotero)',
    access: ['public', 'public', 'public']
  },
  zotero_date: {
    label: 'Date (Zotero)',
    access: ['public', 'public', 'public']
  },
  zotero_archive: {
    label: 'Archive (Zotero)',
    access: ['public', 'public', 'public']
  },
  zotero_loc_archive: {
    label: 'Archive location (Zotero)',
    access: ['public', 'public', 'public']
  },
  title: {
    label: 'Title',
    access: ['public', 'public', 'public'],
  },
  item_type: {
    label: 'Item type',
    access: ['public', 'public', 'public']
  },
  dates: {
    label: 'Date(s)',
    access: ['public', 'team', 'team']
  },
  abstract: {
    label: 'Document abstract',
    access: ['public', 'team', 'private']
  },
  summary: {
    label: 'Overall summary',
    access: ['team', 'team', 'private']
  },
  keywords: {
    label: 'Other keywords for document',
    access: ['public', 'team', 'private']
  },
  events: {
    label: 'Chronology',
    access: ['public', 'team', 'team']
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
    label: 'Organizations',
    access: ['public', 'team', 'team']
  },
  activist_repertoire: {
    label: 'Action',
    access: ['public', 'team', 'team']
  },
  activist_repertoire_scale: {
    label: 'Scale of repertoire actions',
    access: ['public', 'team', 'team']
  },
  format_of_participation: {
    label: 'Format of participation',
    access: ['public', 'team', 'team']
  },
  knowledge_production: {
    label: 'Communication and knowledge production',
    access: ['public', 'team', 'team']
  },
  activist_repertoire_explanation: {
    label: 'Specific factors/events triggering repertoire actions',
    access: ['team', 'team', 'team']
  },
  triggering_factor_keywords: {
    label: 'Free keywords relating to triggering factors/events',
    access: ['public', 'team', 'team']
  },
  agendas: {
    label: 'Agendas',
    access: ['public', 'team', 'team']
  },
  agendas_explanation: {
    label: 'Further explanation of agendas',
    access: ['team', 'team', 'team']
  },
  effects_of_activism: {
    label: 'Actisivm effects',
    access: ['public', 'team', 'team']
  },
  effects_of_activism_explanation: {
    label: 'Further explanation of effects of activism',
    access: ['team', 'team', 'team']
  },
  labour_relations: {
    label: 'Labour relations',
    access: ['public', 'team', 'team']
  },
  labour_relations_explanation: {
    label: 'Further explanation of labour relations',
    access: ['team', 'team', 'team']
  },
  labour_conditions: {
    label: 'Labour conditions',
    access: ['public', 'team', 'team']
  },
  labour_conditions_explanation: {
    label: 'Further explanation of labour conditions',
    access: ['team', 'team', 'team']
  },
  living_conditions: {
    label: 'Living conditions',
    access: ['public', 'team', 'team']
  },
  living_conditions_explanation: {
    label: 'Further explanation of living conditions',
    access: ['team', 'team', 'team']
  },
  historical_context: {
    label: 'Historical context',
    access: ['public', 'public', 'team']
  },
  historical_context_explanation: {
    label: 'Further explanation of historical context (including reflections on gender and labour regime)',
    access: ['team', 'team', 'team']
  },
  activism_broad_patterns: {
    label: 'Broad patterns of activism and non-activism',
    access: ['team', 'team', 'team']
  },
  activism_broad_patterns_explanation: {
    label: 'Further explanation of pattern of (non)activism',
    access: ['team', 'team', 'team']
  },
  additional_research: {
    label: 'Additional research and interpretative notes/ideas',
    access: ['team', 'private', 'private']
  },
  interview_consents: {
    label: 'Interview consents',
    access: ['team', 'team', 'team']
  },
  document_permissions: {
    label: 'Document permissions',
    access: ['team', 'team', 'team']
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
